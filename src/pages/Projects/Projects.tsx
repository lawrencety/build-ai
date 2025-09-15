import React, { useMemo, useState } from 'react';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(p => p.name.toLowerCase().includes(q));
  }, [projects, query]);

  function handleCreate(e) {
    e.preventDefault();
    const name = newProjectName.trim();
    if (!name) return;
    // Avoid duplicates by name
    setProjects(prev =>
      prev.some(p => p.name.toLowerCase() === name.toLowerCase())
        ? prev
        : [{ id: crypto.randomUUID(), name }, ...prev]
    );
    setNewProjectName('');
  }

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Projects</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Create a project</h2>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Project name"
            value={newProjectName}
            onChange={e => setNewProjectName(e.target.value)}
            aria-label="Project name"
            style={{ flex: 1, padding: '0.5rem' }}
          />
          <button type="submit">Create</button>
        </form>
      </section>

      <section>
        <h2 style={{ marginBottom: '0.5rem' }}>Find existing projects</h2>
        <input
          type="search"
          placeholder="Search projects..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search projects"
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />

        {filtered.length === 0 ? (
          <p style={{ color: '#666' }}>No projects found.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filtered.map(p => (
              <li
                key={p.id}
                style={{
                  padding: '0.75rem 0',
                  borderBottom: '1px solid #eaeaea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{p.name}</span>
                {/* Placeholder actions for future navigation or details */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={() => alert(`Open ${p.name}`)}>
                    Open
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setProjects(prev => prev.filter(x => x.id !== p.id))
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}