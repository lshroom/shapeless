'use client';

import React, { useState } from 'react';
import { ConnectionDetails } from './types';

interface ConnectionInfoProps {
  details: ConnectionDetails;
  sessionName: string;
}

export default function ConnectionInfo({ details, sessionName }: ConnectionInfoProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const sonobusUrl = `sonobus://${details.serverAddress}?group=${encodeURIComponent(details.groupName)}${
    details.password ? `&password=${encodeURIComponent(details.password)}` : ''
  }`;

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 border border-purple-500/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-purple-400">{sessionName}</h3>
        <button
          onClick={() => window.open(sonobusUrl, '_self')}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open in SonoBus
        </button>
      </div>

      <div className="space-y-4">
        {/* Server Address */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">Server Address</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={details.serverAddress}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white font-mono text-sm"
            />
            <button
              onClick={() => copyToClipboard(details.serverAddress, 'server')}
              className="btn-secondary"
            >
              {copied === 'server' ? '✓' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Group Name */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">Group Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={details.groupName}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white font-mono text-sm"
            />
            <button
              onClick={() => copyToClipboard(details.groupName, 'group')}
              className="btn-secondary"
            >
              {copied === 'group' ? '✓' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Password */}
        {details.password && (
          <div>
            <label className="block text-xs text-gray-400 mb-2">Password</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={details.password}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white font-mono text-sm"
              />
              <button
                onClick={() => copyToClipboard(details.password!, 'password')}
                className="btn-secondary"
              >
                {copied === 'password' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>
        )}

        {/* Audio Quality */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">Recommended Audio Quality</label>
          <div className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm capitalize">
            {details.audioQuality}
          </div>
        </div>

        {/* Buffer Time */}
        <div>
          <label className="block text-xs text-gray-400 mb-2">Buffer Time (ms)</label>
          <div className="px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white text-sm">
            {details.bufferTime}ms
          </div>
        </div>

        {/* Quick Copy All */}
        <div className="pt-4 border-t border-gray-700">
          <button
            onClick={() => {
              const allDetails = `Server: ${details.serverAddress}\nGroup: ${details.groupName}${
                details.password ? `\nPassword: ${details.password}` : ''
              }\nQuality: ${details.audioQuality}\nBuffer: ${details.bufferTime}ms`;
              copyToClipboard(allDetails, 'all');
            }}
            className="w-full btn-secondary"
          >
            {copied === 'all' ? '✓ Copied!' : 'Copy All Details'}
          </button>
        </div>
      </div>

      {/* QR Code Placeholder */}
      <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-700 text-center">
        <p className="text-xs text-gray-500 mb-2">Quick Connect QR Code</p>
        <div className="w-32 h-32 mx-auto bg-white rounded flex items-center justify-center">
          <span className="text-gray-400 text-xs">QR Code</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Scan to connect automatically</p>
      </div>
    </div>
  );
}
