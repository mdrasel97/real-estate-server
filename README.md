# Real Estate Server

A robust Express.js backend server for a comprehensive real estate management platform. Built with TypeScript, Prisma ORM, and advanced features like authentication, payment processing, and file uploads.

# Credentials for Testing

- **Admin**
  - Email:mollarasel972@gmail.com
  - Password:12345678

- **Agent**
  - Email:ultrasrealpro@gmail.com
  - Password:12345678

- **user**
  - Email:
  - Password:12345678

# Live Demo

- **Frontend:** [https://real-estate-client-drab-three.vercel.app](https://real-estate-client-drab-three.vercel.app)
- **Backend API:** [https://real-state-server-cyan.vercel.app](https://real-state-server-cyan.vercel.app)

## 🚀 Features

### Core Features

- **User Management** - Role-based access control (Admin, Agent, User)
- **Property Management** - Create, update, delete, and manage properties
- **Booking System** - Handle property bookings with approval workflow
- **Reviews & Ratings** - Post and manage property reviews
- **Payment Processing** - Stripe integration for booking fees and premium features
- **File Upload** - Cloudinary integration for property images and media

### Security Features

- **Authentication** - JWT-based auth with Better-auth library
- **Authorization** - Role-based middleware protection
- **Rate Limiting** - Express rate limiting to prevent abuse
- **Helmet** - Security headers with Helmet middleware
- **CORS** - Configurable cross-origin resource sharing
- **Input Validation** - Zod schema validation for all requests

### Advanced Features

- **Email Notifications** - Nodemailer integration for email sending
- **Logging** - Winston-based HTTP and system logging
- **Database Migrations** - Prisma migrations for schema management
- **Error Handling** - Comprehensive error handling with custom error classes
- **Data Seeding** - Admin user and demo data seeding

## 🛠️ Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js 5.2.1
- **ORM:** Prisma 7.3.0 with PostgreSQL adapter
- **Authentication:** Better-auth 1.4.18
- **Payment:** Stripe 21.0.1
- **File Upload:** Multer 2.0.2 + Cloudinary
- **Email:** Nodemailer 7.0.13
- **Validation:** Zod 4.1.13
- **Security:** Helmet 8.1.0, CORS
- **Logging:** Winston 3.19.0
- **Build Tool:** tsup 8.5.1
- **Database Driver:** PostgreSQL (pg)

## 📁 Project Structure

```
src/
├── app/
│   ├── modules/                 # Feature modules
│   │   ├── auth/               # Authentication (Better-auth)
│   │   ├── user/               # User management
│   │   │   ├── user.route.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.validation.ts
│   │   ├── property/           # Property listings
│   │   │   ├── property.routes.ts
│   │   │   ├── property.controller.ts
│   │   │   ├── property.service.ts
│   │   │   └── property.validation.ts
│   │   ├── booking/            # Booking management
│   │   │   ├── booking.routes.ts
│   │   │   ├── booking.controller.ts
│   │   │   ├── booking.service.ts
│   │   │   └── booking.validation.ts
│   │   ├── payment/            # Payment processing
│   │   │   ├── payment.routes.ts
│   │   │   ├── payment.controller.ts
│   │   │   └── payment.service.ts
│   │   └── review/             # Reviews & ratings
│   │       ├── review.route.ts
│   │       ├── review.controller.ts
│   │       ├── review.service.ts
│   │       └── review.validation.ts
│   ├── middleware/              # Express middleware
│   │   ├── Auth.ts             # Authentication check
│   │   ├── GlobalErrorHandler.ts
│   │   ├── HttpLogger.ts       # Winston logging
│   │   ├── NotFound.ts         # 404 handler
│   │   └── ValidateRequest.ts  # Zod validation
│   ├── errors/                  # Error handling
│   │   ├── ApiError.ts         # Custom error class
│   │   ├── ErrorInterface.ts
│   │   └── handleZodError.ts
│   ├── helper/
│   │   ├── Querybuilder.ts     # Dynamic query building
│   │   └── query.interface.ts
│   ├── lib/
│   │   ├── auth.ts             # Better-auth config
│   │   └── ...
│   ├── shared/                  # Shared utilities
│   │   ├── catchAsync.ts       # Async error wrapper
│   │   └── sendResponse.ts     # Standard response format
│   ├── routes/
│   │   └── index.ts            # Route aggregator
│   ├── templates/              # Email templates (EJS)
│   ├── script/
│   │   └── seed.ts             # Database seeding
│   └── types/                   # TypeScript types
├── prisma/
│   ├── schema/                  # Prisma schemas (modular)
│   │   ├── schema.prisma       # Main schema
│   │   ├── auth.prisma
│   │   ├── user.prisma
│   │   ├── property.prisma
│   │   ├── booking.prisma
│   │   ├── payment.prisma
│   │   ├── review.prisma
│   │   ├── favorite.prisma
│   │   ├── propertyImage.prisma
│   │   └── enum.prisma
│   └── migrations/             # Database migrations
├── config/
│   ├── env.ts                  # Environment configuration
│   ├── cloudinary.config.ts    # Cloudinary setup
│   ├── logger.ts               # Winston logger setup
│   ├── multer.config.ts        # Multer file upload config
│   └── ...
├── app.ts                      # Express app setup
├── server.ts                   # Server entry point
└── logs/                       # Application logs
```

## 🔐 Authentication & Authorization

### Authentication Flow

1. User registers/logs in via `/api/auth` (Better-auth endpoints)
2. JWT token issued and stored in HTTP-only cookie
3. Token sent with requests in Authorization header
4. Middleware verifies token and extracts user info

### Role-Based Authorization

- **ADMIN** - Full system access, user management, property feature toggle
- **AGENT** - Create/manage own properties, view bookings
- **USER** - Book properties, leave reviews, view favorites

### Protected Routes

```typescript
router.patch(
  "/featured/:id",
  checkAuth(Role.ADMIN), // Only admins
  PropertyController.isFeaturedProperty,
);

router.post(
  "/",
  checkAuth(Role.AGENT), // Only agents
  PropertyController.createProperty,
);
```

## 📊 Database Schema

### User

- id, email, name, phone, role (ADMIN, AGENT, USER)
- status (ACTIVE, INACTIVE, SUSPENDED)
- image, profileComplete, createdAt, updatedAt

### Property

- id, title, description, price, location, address
- bedrooms, bathrooms, area, type, listingType
- status (AVAILABLE, RENTED, DRAFT)
- isFeatured, isPremium, thumbnail
- agentId (foreign key to User)
- createdAt, updatedAt

### Booking

- id, propertyId, userId, agentId
- status (PENDING, APPROVED, REJECTED, COMPLETED)
- startDate, endDate, totalPrice
- bookingFee, createdAt, updatedAt

### Review

- id, propertyId, userId, rating (1-5)
- comment, createdAt, updatedAt

### Payment

- id, bookingId, userId, amount, currency
- status, paymentMethod, stripePaymentIntentId
- createdAt, updatedAt

### PaymentSetting

- id, bookingFee, premiumFee, currency, agentId
- createdAt, updatedAt

### Favorite

- id, userId, propertyId, createdAt

### PropertyImage

- id, propertyId, url, createdAt

## 🔌 API Endpoints

### Authentication (`/api/auth`)

- Better-auth handles: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`

### Users (`/api/v1/users`)

- `GET /` - List all users (Admin only)
- `GET /:id` - Get user details
- `PATCH /:id` - Update user (Admin/Owner)
- `PATCH /:id/status` - Update user status (Admin only)
- `DELETE /:id` - Delete user (Admin/Owner)

### Properties (`/api/v1/properties`)

- `GET /` - List all properties (with filters)
- `GET /featured` - Get featured properties
- `GET /:id` - Get property details
- `POST /` - Create property (Agent only)
- `PUT /:id` - Update property (Agent only)
- `PATCH /status/:id` - Update property status
- `PATCH /featured/:id` - Toggle featured (Admin only)
- `DELETE /:id` - Delete property (Admin/Agent owner)
- `GET /agent/properties` - Get owner's properties (Agent only)
- `GET /agent/bookings` - Get bookings for agent's properties

### Bookings (`/api/v1/bookings`)

- `GET /` - List bookings (with filters)
- `GET /:id` - Get booking details
- `POST /` - Create booking (User only)
- `PATCH /:id/status` - Update booking status
- `DELETE /:id` - Cancel booking

### Payments (`/api/v1/payments`)

- `GET /settings` - Get payment settings (Agent)
- `PATCH /settings` - Update payment settings (Agent)
- `POST /` - Create payment
- `POST /webhook` - Stripe webhook (no auth required)
- `GET /` - List payments
- `GET /:id` - Get payment details

### Reviews (`/api/v1/reviews`)

- `GET /property/:propertyId` - Get reviews for property
- `POST /` - Create review (User only)
- `PUT /:id` - Update review (Owner only)
- `DELETE /:id` - Delete review (Owner only)

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
NODE_ENV=development
PORT=5000
LOG_DIR=logs

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/real_estate_db

# Frontend
FRONTEND_URL=http://localhost:3000

# Authentication (Better-auth)
BETTER_AUTH_SECRET=your_secret_key_here
BETTER_AUTH_URL=http://localhost:5000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm generate

# Setup database
pnpm push              # Push schema to database
pnpm migrate           # Create migration
pnpm admin:seed        # Seed admin and demo data

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🗄️ Database Management

```bash
# Create a new migration
pnpm migrate dev --name migration_name

# Push schema changes
pnpm push

# Pull schema from database
pnpm pull

# Open Prisma Studio (visual DB browser)
pnpm studio

# Format schema
pnpm format

# Generate Prisma client
pnpm generate
```

## 🚀 Running the Server

### Development

```bash
pnpm dev
# Runs on http://localhost:5000 with hot reload
```

### Production

```bash
pnpm build
pnpm start
# Optimized production build
```

### Type Checking & Linting

```bash
pnpm check        # TypeScript type check
pnpm lint         # ESLint check
pnpm check:all    # Full validation + build
```

## 📝 Key Utilities

### Error Handling

```typescript
// Custom error class
throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid request");

// Async wrapper
const handler = catchAsync(async (req, res) => {
  // async code - errors automatically caught
});
```

### Standard Response Format

```typescript
sendResponse(res, {
  statusCode: StatusCodes.OK,
  success: true,
  message: "Success message",
  data: resultData,
  meta: { total: 10, page: 1 },
});
```

### Query Builder

Dynamic query building for filters, search, sorting, pagination:

```typescript
const query = req.query as IQueryParams;
const result = PropertyService.getAllProperties(query);
// Supports: searchTerm, filter, fields, sort, pagination
```

### Validation

Zod schemas for request validation:

```typescript
const schema = z.object({
  title: z.string().min(5),
  price: z.number().positive(),
});
```

## 📧 Email Templates

Email templates in `src/app/templates/` can be used with Nodemailer:

- Password reset emails
- Booking confirmation emails
- Review notifications
- Payment receipts

## 📊 Logging

Winston logger configured in `config/logger.ts`:

- HTTP request logging (method, URL, response time, IP)
- Error logging to `logs/error.log`
- Combined logs to `logs/combined.log`
- Console output in development

## 🔒 Security Best Practices

- ✅ Using Helmet for security headers
- ✅ CORS validation against frontend URL
- ✅ Rate limiting enabled (configurable)
- ✅ Input validation with Zod schemas
- ✅ SQL injection prevention via Prisma ORM
- ✅ XSS protection through proper content-type headers
- ✅ JWT token in HTTP-only cookies
- ✅ Environment variables for sensitive data

## 🚀 Deployment

### Vercel

```bash
pnpm build
vercel --prod
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 5000
CMD ["pnpm", "start"]
```

## 🐛 Troubleshooting

### Prisma Issues

```bash
# Regenerate Prisma client
pnpm generate

# Reset database (development only)
pnpm prisma migrate reset
```

### Database Connection

- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Ensure port 5432 is accessible

### Cloudinary Upload Issues

- Verify API credentials in `.env`
- Check multer configuration
- Ensure file size limits are appropriate

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.
