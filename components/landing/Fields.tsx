const fields = [
  { name: 'Frontend Development', desc: 'HTML, CSS, JavaScript, React', icon: '🖥️', available: true },
  { name: 'Backend Development', desc: 'Node.js, APIs, Databases', icon: '⚙️', available: false },
  { name: 'UI/UX Design', desc: 'Figma, Wireframes, Prototypes', icon: '🎨', available: false },
  { name: 'Data Analysis', desc: 'Excel, SQL, Python basics', icon: '📊', available: false },
  { name: 'Content Writing', desc: 'Blogs, Copywriting, SEO', icon: '✍️', available: false },
  { name: 'Digital Marketing', desc: 'SEO, Ads, Social Media', icon: '📣', available: false },
]

export default function Fields() {
  return (
    <section className="px-6 py-20 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h3 className="text-3xl font-black mb-3">Available Tracks</h3>
          <p className="text-gray-400">More fields being added every month</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`bg-gray-900 rounded-2xl p-6 border transition ${
                field.available
                  ? 'border-blue-500/30 hover:border-blue-500/60'
                  : 'border-gray-800 opacity-60'
              }`}
            >
              <div className="text-3xl mb-3">{field.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-white font-bold">{field.name}</h4>
                {field.available
                  ? <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Live</span>
                  : <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded-full">Soon</span>
                }
              </div>
              <p className="text-gray-400 text-sm">{field.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}