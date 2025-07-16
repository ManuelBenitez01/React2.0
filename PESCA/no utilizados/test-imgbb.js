// 🧪 Script de prueba para verificar API key de ImgBB
// Ejecuta este código en la consola del navegador para probar tu API key

async function probarImgBB(apiKey) {
  console.log('🧪 Probando API key de ImgBB...');
  
  // Crear una imagen de prueba pequeña (1x1 pixel transparente)
  const testImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  
  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', testImageBase64);
  
  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ API key válida! Imagen de prueba subida:', data.data.url);
      return true;
    } else {
      console.error('❌ API key inválida:', data.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Error al probar API key:', error);
    return false;
  }
}

// Para usar este script:
// 1. Abre la consola del navegador (F12 -> Console)
// 2. Pega este código
// 3. Ejecuta: probarImgBB('TU_API_KEY_AQUI')

console.log('🔑 Script de prueba ImgBB cargado. Usa: probarImgBB("tu_api_key_aqui")');
