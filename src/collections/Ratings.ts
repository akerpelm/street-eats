import { CollectionConfig } from 'payload';

const Ratings: CollectionConfig = {
  slug: 'ratings',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'ratingType', 'createdAt'],
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: () => true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ratingType',
      type: 'radio',
      required: true,
      options: [
        { label: 'Vendor', value: 'vendor' },
        { label: 'MenuItem', value: 'menuItem' },
      ],
    },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'vendors',
      admin: {
        condition: (data) => data.ratingType === 'vendor',
      },
    },
    {
      name: 'menuItem',
      type: 'relationship',
      relationTo: 'menuItems',
      admin: {
        condition: (data) => data.ratingType === 'menuItem',
      },
    },
    {
      name: 'vendorRating',
      type: 'group',
      admin: {
        condition: (data) => data.ratingType === 'vendor',
      },
      fields: [
        {
          name: 'foodQuality',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'service',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'value',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'atmosphere',
          type: 'number',
          min: 1,
          max: 5,
        },
        {
          name: 'recommend',
          type: 'checkbox',
          required: true,
        },
      ],
    },
    {
      name: 'menuItemRating',
      type: 'group',
      admin: {
        condition: (data) => data.ratingType === 'menuItem',
      },
      fields: [
        {
          name: 'taste',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'presentation',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'portionSize',
          type: 'number',
          min: 1,
          max: 5,
          required: true,
        },
        {
          name: 'recommend',
          type: 'checkbox',
          required: true,
        },
      ],
    },
    {
      name: 'comment',
      type: 'textarea',
    },
    {
      name: 'tags',
      type: 'select',
      hasMany: true,
      options: [
        'Spicy',
        'Mild',
        'Large Portion',
        'Small Portion',
        'Great Value',
        'Expensive',
        'Quick Service',
        'Slow Service',
        'Fresh',
        'Authentic',
        'Innovative',
        'Worth the Wait',
        'Hidden Gem',
      ],
    },
    {
      name: 'images',
      type: 'array',
      maxRows: 5,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
  ],
  timestamps: true,
};

export default Ratings;
