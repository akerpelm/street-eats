import { CollectionConfig } from 'payload';
import { normalizeTimeString } from '../lib/timeUtils';

const timeFieldProps = {
  type: 'text' as const,
  validate: (val: string | null | undefined) => {
    if (!val) return true; // Allow empty values

    // Match formats: "9:00 AM", "9:00AM", "9 AM", "9AM", "09:00", "13:00"
    const timeRegex =
      /^(0?[1-9]|1[0-2])(?::([0-5]\d))?\s*([AaPp][Mm])|([01]\d|2[0-3]):[0-5]\d$/;

    if (!timeRegex.test(val)) {
      return 'Please enter time in format "9:00 AM", "9 AM", or "13:00"';
    }
    return true;
  },
  admin: {
    placeholder: 'e.g. 9:00 AM or 13:00',
    description: 'Enter time in 12-hour (9:00 AM) or 24-hour (13:00) format',
  },
};

const dayFields = {
  type: 'group' as const,
  fields: [
    {
      name: 'start',
      ...timeFieldProps,
    },
    {
      name: 'end',
      ...timeFieldProps,
    },
  ],
};

const Vendors: CollectionConfig = {
  slug: 'vendors',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (data && data.hours) {
          const normalizedHours = {} as any;

          // Normalize each day's hours
          Object.entries(data.hours).forEach(([day, hours]: [string, any]) => {
            if (hours?.start || hours?.end) {
              normalizedHours[day] = {
                start: normalizeTimeString(hours.start),
                end: normalizeTimeString(hours.end),
              };
            }
          });

          return {
            ...data,
            hours: normalizedHours,
          };
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        // Update rating aggregations when ratings change
        // Implementation details to follow
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            // Auto-generate slug from name if not provided
            if (data && !data.slug && data.name) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            }
            return data ? data.slug : '';
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'location',
      type: 'point',
    },
    {
      name: 'addresses',
      type: 'array',
      fields: [
        {
          name: 'street',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'borough',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'zip',
          type: 'text',
        },
        {
          name: 'primary',
          type: 'checkbox',
          label: 'Primary Address',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'menuItems',
      type: 'relationship',
      relationTo: 'menuItems',
      hasMany: true,
    },
    {
      name: 'hours',
      type: 'group',
      fields: [
        {
          name: 'monday',
          ...dayFields,
        },
        {
          name: 'tuesday',
          ...dayFields,
        },
        {
          name: 'wednesday',
          ...dayFields,
        },
        {
          name: 'thursday',
          ...dayFields,
        },
        {
          name: 'friday',
          ...dayFields,
        },
        {
          name: 'saturday',
          ...dayFields,
        },
        {
          name: 'sunday',
          ...dayFields,
        },
      ],
    },
    {
      name: 'cuisine',
      type: 'select',
      required: true,
      options: [
        'Mexican',
        'Asian',
        'Middle Eastern',
        'American',
        'Mediterranean',
        'Italian',
        'Indian',
        'Caribbean',
        'Greek',
        'Other',
      ],
    },
    {
      name: 'ratings',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'averageRating',
          type: 'group',
          fields: [
            { name: 'foodQuality', type: 'number' },
            { name: 'service', type: 'number' },
            { name: 'value', type: 'number' },
            { name: 'atmosphere', type: 'number' },
          ],
        },
        {
          name: 'recommendationPercentage',
          type: 'number',
        },
        {
          name: 'totalReviews',
          type: 'number',
        },
        {
          name: 'popularTags',
          type: 'array',
          fields: [
            {
              name: 'tag',
              type: 'text',
            },
            {
              name: 'count',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
};

export default Vendors;
