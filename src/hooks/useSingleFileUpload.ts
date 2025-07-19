
export function useSingleFileUpload() {
    const upload = async (file: File) => {
      const formData = new FormData();
      formData.append('files', file); // still use 'files' key for backend compatibility
  
      const res = await fetch('/api/upload/attachment', {
        method: 'POST',
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error('Upload failed');
      }
  
      const data = await res.json();
      return data.uploads[0]; // return the single file result
    };
  
    return { upload };
  }
  