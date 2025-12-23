// Image upload service for handling product images

export interface ImageUploadResponse {
  url: string;
  filename: string;
  size: number;
}

export const imageService = {

  fileToBase64: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
    });
  },

  /**
   * Validate image file
   */
  validateImage: (file: File): { valid: boolean; error?: string } => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Only JPEG, PNG, GIF, and WebP images are allowed',
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Image size must be less than 5MB',
      };
    }

    return { valid: true };
  },

  /**
   * Create image URL from file (for preview)
   */
  createPreviewUrl: (file: File): string => {
    return URL.createObjectURL(file);
  },

  /**
   * Upload image to server (placeholder for actual API)
   */
  uploadImage: async (file: File): Promise<ImageUploadResponse> => {
    const validation = imageService.validateImage(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Convert to base64 for storage
    const base64 = await imageService.fileToBase64(file);

    // In production, you would upload to:
    // - AWS S3
    // - Cloudinary
    // - Firebase Storage
    // - Your backend API

    // For now, return the base64 as the URL
    return {
      url: base64,
      filename: file.name,
      size: file.size,
    };
  },

  /**
   * Compress image before upload
   */
  compressImage: async (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize if larger than 1200px
          if (width > 1200) {
            height = (height * 1200) / width;
            width = 1200;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              resolve(blob || file);
            },
            'image/jpeg',
            0.85
          );
        };
      };
    });
  },
};

