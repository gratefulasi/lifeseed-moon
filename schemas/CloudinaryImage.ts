import { text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { cloudinaryImage } from '@keystone-next/cloudinary';
import 'dotenv/config';
import { isSignedIn, permissions } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'lifeseed',
};
export const CloudinaryImage = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: permissions.canManagePresents,
    delete: permissions.canManagePresents,
  },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
  },
  ui: {
    listView: {
      initialColumns: ['image', 'altText'],
    },
  },
});
