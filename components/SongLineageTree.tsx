import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Song } from '../types';

interface SongLineageTreeProps {
  songs: Song[];
  onNodeClick: (song: Song) => void; // New prop for click handler
}

const SongLineageTree: React.FC<SongLineageTreeProps> = ({ songs, onNodeClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length > 0) {
        const { width, height } = entries[0].contentRect;
        // Ensure minimum dimensions to prevent collapse if container is too small
        setDimensions({ width: Math.max(width, 300), height: Math.max(height, 200) });
      }
    });

    if (svgRef.current) {
      // Observe the parent element to get its full dimensions for the tree
      resizeObserver.observe(svgRef.current.parentElement as Element);
    }

    return () => {
      if (svgRef.current && svgRef.current.parentElement) {
        resizeObserver.unobserve(svgRef.current.parentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear SVG contents

    const margin = { top: 20, right: 120, bottom: 20, left: 120 }; // Adjusted margins for horizontal tree
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // D3 hierarchy setup
    const stratify = d3.stratify<Song>()
      .id(d => d.id)
      .parentId(d => d.parentId || null); // Ensure parentId is null for root nodes

    let root;
    try {
      // Attempt to stratify directly
      root = stratify(songs);
    } catch (e) {
      console.warn("D3 stratify error, likely multiple roots or cyclic dependencies. Unifying under a dummy root.", e);
      const dummyRootId = 'dummy-root';
      
      const existingIds = new Set(songs.map(s => s.id));
      // Identify nodes that are true roots (no parent or parent not found in existing IDs)
      const actualRoots = songs.filter(s => !s.parentId || !existingIds.has(s.parentId));

      // Create a new array of nodes for stratification, linking all actualRoots to a single dummyRoot
      const nodesForStratify = [
        { // The actual dummy root node
          id: dummyRootId,
          title: 'Shapeless Tree (All Tracks)',
          status: 'LOCKED', type: 'ORIGINAL', creator: 'System', // Mark as locked/system for visual distinction
          investors: 0, price: '0 ETH', audioUrl: '', splits: [],
          parentId: undefined // This makes it the ultimate root
        },
        // All other songs, with actualRoots now pointing to the dummyRoot
        ...songs.map(song => ({
          ...song,
          // If this song was an actual root, its parentId is now the dummyRootId
          // Otherwise, retain its original parentId
          parentId: actualRoots.some(r => r.id === song.id) ? dummyRootId : song.parentId
        }))
      ];
      root = stratify(nodesForStratify);
    }

    if (!root) {
        console.error("Failed to generate D3 hierarchy root. Tree will not be rendered.");
        return; // Exit if root couldn't be created
    }

    // Sort children for consistent layout if desired
    root.sort((a, b) => (a.data.title || '').localeCompare(b.data.title || ''));

    // Configure horizontal tree layout: size([height, width])
    const treeLayout = d3.tree<Song>()
      .size([chartHeight, chartWidth]); // Swap width/height for horizontal layout

    const treeData = treeLayout(root);

    // Links (paths)
    g.selectAll('.link')
      .data(treeData.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', '#4a4a4a')
      .attr('stroke-width', 1.5)
      .attr('d', d3.linkHorizontal<d3.HierarchyPointLink<Song>, d3.HierarchyPointNode<Song>>()
        .x(d => d.y) // Map depth (d.y) to x-coordinate
        .y(d => d.x)); // Map breadth (d.x) to y-coordinate

    // Nodes (circles with text)
    const node = g.selectAll('.node')
      .data(treeData.descendants())
      .enter().append('g')
      .attr('class', d => `node ${d.children ? 'node--internal' : 'node--leaf'}`)
      .attr('transform', d => `translate(${d.y},${d.x})`) // Swap x/y for node positioning
      .style('cursor', d => d.data.id === 'dummy-root' ? 'default' : 'pointer') // Add cursor for clickable nodes
      .on('click', (event, d) => { // Add click handler
        if (d.data.id !== 'dummy-root') {
          onNodeClick(d.data);
        }
      });

    node.append('circle')
      .attr('r', 8)
      .attr('fill', d => {
        if (d.data.id === 'dummy-root') return 'transparent'; // Hide dummy root circle
        if (d.data.status === 'SEED') return '#FFEB3B'; // Yellow for Seed
        if (d.data.status === 'PRODUCTION') return '#2196F3'; // Blue for Production
        if (d.data.status === 'LOCKED') return '#F44336'; // Red for Locked
        return '#BBDEFB'; // Default light blue
      })
      .attr('stroke', d => {
        if (d.data.id === 'dummy-root') return 'transparent'; // Hide dummy root stroke
        return '#eee';
      })
      .attr('stroke-width', 2);

    node.append('text')
      .attr('dy', '0.31em')
      .attr('x', d => d.children ? -10 : 10) // Position text relative to circle (left for parents, right for leaves)
      .attr('text-anchor', d => d.children ? 'end' : 'start') // Anchor text accordingly
      .attr('fill', '#e0e0f0')
      .attr('font-size', '10px')
      .text(d => d.data.id === 'dummy-root' ? '' : d.data.title); // Hide text for dummy root

    // Add tooltips
    node.append('title')
      .text(d => d.data.id === 'dummy-root' ? d.data.title : `${d.data.title} (ID: ${d.data.id})\nStatus: ${d.data.status}\nCreator: ${d.data.creator}`);

  }, [songs, dimensions, onNodeClick]);

  return (
    <div style={{ width: '100%', height: '500px', overflow: 'auto' }}> {/* Set a fixed height for the container, allow overflow */}
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    </div>
  );
};

export default SongLineageTree;