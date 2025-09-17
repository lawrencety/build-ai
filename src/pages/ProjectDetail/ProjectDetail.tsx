import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';

interface Document {
  id: string;
  name: string;
  type: 'specification' | 'scope' | 'blueprint' | 'architectural' | 'change_order' | 'other';
  file: File;
  uploadDate: Date;
  size: number;
}

const DOCUMENT_TYPES = [
  { value: 'specification', label: 'Specifications' },
  { value: 'scope', label: 'Scope of Work' },
  { value: 'blueprint', label: 'Blueprints' },
  { value: 'architectural', label: 'Architectural Designs' },
  { value: 'change_order', label: 'Change Orders' },
  { value: 'other', label: 'Other' }
];

export const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedType, setSelectedType] = useState<string>('specification');
  const [isUploading, setIsUploading] = useState(false);

  // Mock project data - in a real app, this would come from an API
  const project = {
    id: projectId,
    name: `Project ${projectId}`,
    description: 'A construction project with various documents and specifications'
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newDocuments: Document[] = Array.from(files).map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: selectedType as Document['type'],
      file,
      uploadDate: new Date(),
      size: file.size
    }));

    setDocuments(prev => [...prev, ...newDocuments]);
    setIsUploading(false);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDocumentsByType = (type: string) => {
    return documents.filter(doc => doc.type === type);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/projects')}
          style={{ 
            marginBottom: '1rem', 
            padding: '0.5rem 1rem',
            background: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Back to Projects
        </button>
        <h1>{project.name}</h1>
        <p style={{ color: '#666', marginBottom: '0' }}>{project.description}</p>
      </div>

      {/* Upload Section */}
      <section style={{ 
        background: '#f9f9f9', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        marginBottom: '2rem',
        border: '1px solid #e0e0e0'
      }}>
        <h2 style={{ marginTop: '0', marginBottom: '1rem' }}>Upload Documents</h2>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <label htmlFor="document-type" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Document Type:
            </label>
            <select
              id="document-type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {DOCUMENT_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="file-upload" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Choose Files:
            </label>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.jpg,.jpeg,.png,.txt"
              onChange={handleFileUpload}
              style={{ padding: '0.5rem' }}
            />
          </div>
        </div>

        {isUploading && (
          <div style={{ color: '#666', fontStyle: 'italic' }}>
            Uploading files...
          </div>
        )}
      </section>

      {/* Documents by Type */}
      {DOCUMENT_TYPES.map(type => {
        const typeDocuments = getDocumentsByType(type.value);
        if (typeDocuments.length === 0) return null;

        return (
          <section key={type.value} style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              borderBottom: '2px solid #007bff', 
              paddingBottom: '0.5rem',
              marginBottom: '1rem'
            }}>
              {type.label}
            </h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {typeDocuments.map(doc => (
                <div
                  key={doc.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    background: '#fff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#f0f0f0',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px'
                    }}>
                      📄
                    </div>
                    <div>
                      <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        {formatFileSize(doc.size)} • {doc.uploadDate.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        // In a real app, this would download or open the file
                        alert(`Opening ${doc.name}`);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteDocument(doc.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* Empty State */}
      {documents.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          color: '#666',
          background: '#f9f9f9',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
          <h3>No documents uploaded yet</h3>
          <p>Upload your first document using the form above to get started.</p>
        </div>
      )}
    </div>
  );
};

