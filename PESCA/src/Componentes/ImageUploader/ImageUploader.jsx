import React, { useState, useRef } from 'react';
import { subirImagen, esImagenValida, formatearTamaño } from '../../services/imageUpload';
import './ImageUploader.css';

const ImageUploader = ({ onImageUploaded, currentImageUrl = '', disabled = false }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImageUrl);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Manejar selección de archivo
  const handleFileSelect = async (file) => {
    if (!esImagenValida(file)) {
      alert('Por favor selecciona una imagen válida (JPG, PNG, GIF, WebP, BMP)');
      return;
    }

    try {
      setUploading(true);
      
      // Crear preview local inmediatamente
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      // Subir imagen a ImgBB
      const imageUrl = await subirImagen(file);
      
      // Actualizar con la URL real
      setPreview(imageUrl);
      onImageUploaded(imageUrl);

      // Limpiar preview local
      URL.revokeObjectURL(localPreview);

    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir imagen: ' + error.message);
      
      // Restaurar preview anterior si había uno
      setPreview(currentImageUrl);
    } finally {
      setUploading(false);
    }
  };

  // Manejar cambio del input file
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Manejar drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => esImagenValida(file));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    } else {
      alert('Por favor arrastra una imagen válida');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  // Abrir selector de archivos
  const openFileSelector = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click();
    }
  };

  // Limpiar imagen
  const clearImage = () => {
    setPreview('');
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-uploader">
      <div className="uploader-controls">
        <button
          type="button"
          onClick={openFileSelector}
          disabled={disabled || uploading}
          className="btn-select-image"
        >
          {uploading ? '⏳ Subiendo...' : '📁 Seleccionar Imagen'}
        </button>
        
        {preview && (
          <button
            type="button"
            onClick={clearImage}
            disabled={disabled || uploading}
            className="btn-clear-image"
          >
            🗑️ Limpiar
          </button>
        )}
      </div>

      <div
        className={`drop-zone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileSelector}
      >
        {preview ? (
          <div className="image-preview">
            <img 
              src={preview} 
              alt="Preview" 
              onError={(e) => {
                e.target.src = '/logo.png';
              }}
            />
            {uploading && (
              <div className="upload-overlay">
                <div className="spinner"></div>
                <span>Subiendo...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="drop-placeholder">
            <div className="drop-icon">📷</div>
            <p>
              <strong>Haz clic aquí o arrastra una imagen</strong>
            </p>
            <small>
              Formatos: JPG, PNG, GIF, WebP, BMP<br/>
              Tamaño máximo: 32MB
            </small>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
        disabled={disabled || uploading}
      />

      <small className="uploader-help">
        💡 Tip: También puedes pegar una URL en el campo de arriba
      </small>
    </div>
  );
};

export default ImageUploader;
