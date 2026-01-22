export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-purple-950 to-cyber-dark">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyber-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            SHAPELESS
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Peace Through Music
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A platform for collaborative music creation bringing together artists from Israel and Palestine
            to create a wave of peace through creative expression.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-6 border border-cyber-blue/30 hover:border-cyber-blue transition-all">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-xl font-bold mb-2 text-cyber-blue">Music Collaboration</h3>
            <p className="text-gray-400">
              Create music together using integrated SonoBus sessions and professional audio routing.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-6 border border-neon-purple/30 hover:border-neon-purple transition-all">
            <div className="text-4xl mb-4">🌊</div>
            <h3 className="text-xl font-bold mb-2 text-neon-purple">Wave Growth</h3>
            <p className="text-gray-400">
              Expand the movement exponentially - each member invites 2 more, creating powerful waves of change.
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-6 border border-neon-pink/30 hover:border-neon-pink transition-all">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2 text-neon-pink">AI Moderation</h3>
            <p className="text-gray-400">
              Gemini and Claude work together to keep discussions constructive and peace-focused.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-cyber-blue to-neon-purple text-white font-bold py-4 px-8 rounded-lg text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-cyber-blue/50">
            Join the Movement
          </button>
        </div>

        {/* Integration Previews */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900/30 backdrop-blur-lg rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-cyber-blue">Video Composite Studio</h3>
            <p className="text-gray-400 mb-4">
              Multi-layer video mixing with real-time effects and director controls.
            </p>
            <div className="bg-gray-950 rounded p-4 text-sm text-gray-500">
              [Video Composite Component Will Load Here]
            </div>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-lg rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-neon-purple">SonoBus Sessions</h3>
            <p className="text-gray-400 mb-4">
              Join collaborative audio sessions for real-time music creation.
            </p>
            <div className="bg-gray-950 rounded p-4 text-sm text-gray-500">
              [SonoBus Manager Component Will Load Here]
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
