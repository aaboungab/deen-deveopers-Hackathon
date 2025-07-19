
export function useMultipleFileUpload() {
    const upload = async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
  
      const res = await fetch('/api/upload/attachment', {
        method: 'POST',
        body: formData,
      });
  
      if (!res.ok) {
        throw new Error('Upload failed');
      }
  
      const data = await res.json();
      return data.uploads; // array of uploaded file metadata
    };
  
    return { upload };
  }
  

//   // example usage in a component
// const { upload: uploadSingle } = useSingleFileUpload();
// const { upload: uploadMultiple } = useMultipleFileUpload();

// // Single
// await uploadSingle(file);

// // Multiple
// await uploadMultiple([file1, file2, file3]);
