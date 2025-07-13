import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import '../Css/AdminPanel.css';

const AdminPanel = () => {
  const [project, setProject] = useState({ name: '', description: '', imageUrl: '' });
  const [client, setClient] = useState({ name: '', description: '', designation: '', imageUrl: '' });
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      const [contactRes, newsletterRes, projectRes, clientRes] = await Promise.all([
        axiosClient.get('/api/contacts'),
        axiosClient.get('/api/newsletter'),
        axiosClient.get('/api/projects'),
        axiosClient.get('/api/clients'),
      ]);
      setContacts(contactRes.data);
      setSubscribers(newsletterRes.data);
      setProjects(projectRes.data);
      setClients(clientRes.data);
    };
    fetchData();
  }, []);

  // Add Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    await axiosClient.post('/api/projects', project);
    alert('Project added!');
    setProject({ name: '', description: '', imageUrl: '' });
    const updatedProjects = await axiosClient.get('/api/projects');
    setProjects(updatedProjects.data);
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axiosClient.delete(`/api/projects/${id}`);
        setProjects((prev) => prev.filter((p) => p._id !== id));
        alert("Project deleted!");
      } catch (err) {
        alert("Error deleting project");
      }
    }
  };

  // Add Client
  const handleAddClient = async (e) => {
    e.preventDefault();
    await axiosClient.post('/api/clients', client);
    alert('Client added!');
    setClient({ name: '', description: '', designation: '', imageUrl: '' });
    const updatedClients = await axiosClient.get('/api/clients');
    setClients(updatedClients.data);
  };

  // Delete Client
  const handleDeleteClient = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await axiosClient.delete(`/api/clients/${id}`);
        setClients((prev) => prev.filter((c) => c._id !== id));
        alert("Client deleted!");
      } catch (err) {
        alert("Error deleting client");
      }
    }
  };

  // Delete Contact
  const handleDeleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axiosClient.delete(`/api/contacts/${id}`);
        setContacts((prev) => prev.filter((c) => c._id !== id));
        alert("Contact deleted!");
      } catch (err) {
        alert("Error deleting contact");
      }
    }
  };

  // Delete Subscriber
  const handleDeleteSubscriber = async (id) => {
    if (window.confirm("Are you sure you want to delete this subscriber?")) {
      try {
        await axiosClient.delete(`/api/newsletter/${id}`);
        setSubscribers((prev) => prev.filter((s) => s._id !== id));
        alert("Subscriber deleted!");
      } catch (err) {
        alert("Error deleting subscriber");
      }
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Add Project */}
      <section>
        <h2>Add Project</h2>
        <form onSubmit={handleAddProject}>
          <input placeholder="Name" value={project.name} onChange={(e) => setProject({ ...project, name: e.target.value })} />
          <input placeholder="Image URL" value={project.imageUrl} onChange={(e) => setProject({ ...project, imageUrl: e.target.value })} />
          <textarea placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} />
          <button type="submit">Add Project</button>
        </form>
      </section>

      {/* List Projects */}
      <section>
        <h2>All Projects</h2>
        <ul>
          {projects.map((p) => (
            <li key={p._id}>
              <img src={p.imageUrl} alt={p.name} width="80" />
              <strong>{p.name}</strong> - {p.description}
              <br />
              <button onClick={() => handleDeleteProject(p._id)} style={{ color: 'white' }}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Add Client */}
      <section>
        <h2>Add Client</h2>
        <form onSubmit={handleAddClient}>
          <input placeholder="Name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
          <input placeholder="Image URL" value={client.imageUrl} onChange={(e) => setClient({ ...client, imageUrl: e.target.value })} />
          <input placeholder="Designation" value={client.designation} onChange={(e) => setClient({ ...client, designation: e.target.value })} />
          <textarea placeholder="Description" value={client.description} onChange={(e) => setClient({ ...client, description: e.target.value })} />
          <button type="submit">Add Client</button>
        </form>
      </section>

      {/* List Clients */}
      <section>
        <h2>All Clients</h2>
        <ul>
          {clients.map((c) => (
            <li key={c._id}>
              <img src={c.imageUrl} alt={c.name} width="80" />
              <strong>{c.name}</strong> - {c.designation} <br />
              {c.description}
              <br />
              <button onClick={() => handleDeleteClient(c._id)} style={{ color: 'white' }}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact Submissions */}
      <section>
        <h2>Contact Submissions</h2>
        <ul>
          {contacts.map((c) => (
            <li key={c._id}>
              {c.fullName} | {c.email} | {c.mobile} | {c.city}
              <br />
              <button onClick={() => handleDeleteContact(c._id)} style={{ color: 'white' }}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Newsletter Subscribers */}
      <section>
        <h2>Newsletter Subscribers</h2>
        <ul>
          {subscribers.map((s) => (
            <li key={s._id}>
              {s.email}
              <br />
              <button onClick={() => handleDeleteSubscriber(s._id)} style={{ color: 'white' }}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
