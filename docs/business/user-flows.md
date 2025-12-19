# RukaTi - User Flows

This document outlines the key user journeys and interaction flows within the RukaTi service marketplace platform.

---

## 1. Customer Journey - Finding a Service

### Flow Overview

A customer visits RukaTi to find a local service provider (e.g., cleaner, electrician, tutor).

### User Flow Diagram

```mermaid
flowchart TD
    A[Customer visits RukaTi] --> B{Authenticated?}
    B -->|No| C[Browse as Guest]
    B -->|Yes| D[Browse as User]

    C --> E[View Homepage]
    D --> E

    E --> F[Click Services or Category]
    F --> G[View Services Feed]

    G --> H{Apply Filters?}
    H -->|Yes| I[Select Category/Location]
    I --> G
    H -->|No| J[Browse Service Cards]

    J --> K[Click Service Card]
    K --> L[View Service Details]

    L --> M{Interested?}
    M -->|No| G
    M -->|Yes| N[View Contact Info]

    N --> O{Authenticated?}
    O -->|No| P[Prompt to Login/Register]
    O -->|Yes| Q[Contact Provider]

    P --> R[Login/Register]
    R --> Q

    Q --> S[End - Contact Made]
```

### Detailed Steps

#### Step 1: Landing

- Customer arrives at homepage
- Sees hero section with value proposition
- Views featured categories
- Can browse without authentication

#### Step 2: Service Discovery

- **Option A:** Click on category tile from homepage
- **Option B:** Navigate to "Services" page
- **Option C:** Use search functionality (if implemented)

#### Step 3: Filtering & Browsing

- View services feed with category sidebar
- Apply filters:
  - **Category:** Home Repairs, Cleaning, Tutoring, Pet Care, Landscaping, Event Help, Other
  - **Location:** Neighborhood-based (Zamet, Centar, Trsat)
- Browse service cards showing:
  - Service title
  - Provider name
  - Category badge
  - Price range
  - Rating
  - Service image

#### Step 4: Service Details

- Click on service card
- View detailed service page:
  - Full description
  - Provider information
  - Contact details
  - Service images
  - Reviews (when implemented)
  - Availability status

#### Step 5: Contact Provider

- If authenticated: View contact information directly
- If not authenticated: Prompted to login/register
- Contact via provided phone/email

---

## 2. Service Provider Journey - Creating a Service

### Flow Overview

A service provider registers and creates their first service listing.

### User Flow Diagram

```mermaid
flowchart TD
    A[Provider visits RukaTi] --> B{Has Account?}
    B -->|No| C[Click Register]
    B -->|Yes| D[Click Login]

    C --> E[Fill Registration Form]
    E --> F[Submit Registration]
    F --> G[Email Verification]
    G --> H[Login]

    D --> H
    H --> I[Navigate to Services Page]

    I --> J[Click 'Offer Your Service']
    J --> K[Create Service Modal Opens]

    K --> L[Fill Service Form]
    L --> M{Form Valid?}
    M -->|No| N[Show Validation Errors]
    N --> L
    M -->|Yes| O[Upload Service Image]

    O --> P[Submit Service]
    P --> Q{Success?}
    Q -->|No| R[Show Error Message]
    R --> L
    Q -->|Yes| S[Service Created]

    S --> T[View in Dashboard]
    T --> U[End - Service Live]
```

### Detailed Steps

#### Step 1: Registration

- Click "Register" button
- Fill registration form:
  - Email
  - Password
  - Full name
  - Phone number
  - Role selection (Customer/Provider)
- Submit and verify email
- Login with credentials

#### Step 2: Navigate to Services

- Click "Services" in navigation
- View services marketplace
- See "Offer Your Service" button (authenticated users only)

#### Step 3: Create Service Modal

- Click "Offer Your Service" button
- Modal opens with service creation form
- Form fields:
  - **Title** (required, min 3 characters)
  - **Description** (required, min 10 characters)
  - **Category** (required, dropdown selection)
  - **Location** (optional, text input)
  - **Contact** (optional, phone/email)
  - **Price Range** (optional, e.g., "50-100 EUR")
  - **Availability** (optional, e.g., "Weekdays 9-5")
  - **Service Image** (optional, drag-and-drop upload)

#### Step 4: Form Validation

- Real-time validation with React Hook Form + Zod
- Error messages displayed inline
- Submit button disabled until form is valid

#### Step 5: Service Creation

- Submit form to Supabase
- Image uploaded to storage (if provided)
- Service record created in `user_services` table
- Success notification displayed
- Modal closes
- Service appears in marketplace and provider's dashboard

---

## 3. Service Provider Journey - Managing Services

### Flow Overview

Provider edits, deletes, or updates availability of existing services.

### User Flow Diagram

```mermaid
flowchart TD
    A[Provider logs in] --> B[Navigate to Dashboard]
    B --> C[View My Services]

    C --> D{Select Action}

    D -->|Edit| E[Click Edit Icon]
    E --> F[Edit Service Modal Opens]
    F --> G[Modify Service Details]
    G --> H[Submit Changes]
    H --> I[Service Updated]
    I --> C

    D -->|Delete| J[Click Delete Icon]
    J --> K[Confirmation Dialog]
    K --> L{Confirm?}
    L -->|No| C
    L -->|Yes| M[Delete Service]
    M --> N[Service Removed]
    N --> C

    D -->|Toggle Availability| O[Click Availability Switch]
    O --> P[Update Status]
    P --> Q[Status Changed]
    Q --> C
```

### Detailed Steps

#### Edit Service

1. Navigate to dashboard
2. View list of own services
3. Click edit icon on service card
4. Edit service modal opens with pre-filled data
5. Modify any fields
6. Submit changes
7. Service updated in database
8. Success notification shown

#### Delete Service

1. Click delete icon on service card
2. Confirmation dialog appears
3. Confirm deletion
4. Service removed from database
5. Service card removed from UI
6. Success notification shown

#### Toggle Availability

1. Use availability switch on service card
2. Status updated immediately
3. Visual feedback provided
4. Database updated in background

---

## 4. Authentication Flow

### Registration Flow

```mermaid
flowchart TD
    A[Click Register] --> B[Registration Form]
    B --> C[Enter Email]
    C --> D[Enter Password]
    D --> E[Enter Full Name]
    E --> F[Enter Phone Number]
    F --> G[Select Role]
    G --> H[Submit Form]

    H --> I{Valid?}
    I -->|No| J[Show Errors]
    J --> B
    I -->|Yes| K[Create Account via Supabase]

    K --> L{Success?}
    L -->|No| M[Show Error Message]
    M --> B
    L -->|Yes| N[Create User Profile]

    N --> O[Send Verification Email]
    O --> P[Redirect to Login]
    P --> Q[End]
```

### Login Flow

```mermaid
flowchart TD
    A[Click Login] --> B[Login Form]
    B --> C[Enter Email]
    C --> D[Enter Password]
    D --> E[Submit Form]

    E --> F{Valid Credentials?}
    F -->|No| G[Show Error]
    G --> B
    F -->|Yes| H[Authenticate via Supabase]

    H --> I{Success?}
    I -->|No| J[Show Error Message]
    J --> B
    I -->|Yes| K[Fetch User Profile]

    K --> L[Set User Session]
    L --> M[Redirect to Dashboard/Services]
    M --> N[End]
```

---

## 5. Service Discovery Flow (Customer)

### Category-Based Discovery

```mermaid
flowchart TD
    A[Homepage] --> B[View Category Tiles]
    B --> C[Click Category]
    C --> D[Services Page with Filter Applied]
    D --> E[View Filtered Services]
    E --> F{Refine?}
    F -->|Yes| G[Apply Additional Filters]
    G --> E
    F -->|No| H[Select Service]
    H --> I[View Service Details]
```

### Search-Based Discovery (Planned)

```mermaid
flowchart TD
    A[Any Page] --> B[Enter Search Query]
    B --> C[Submit Search]
    C --> D[View Search Results]
    D --> E{Satisfied?}
    E -->|No| F[Refine Search]
    F --> B
    E -->|Yes| G[Select Service]
    G --> H[View Service Details]
```

---

## 6. Provider Profile View Flow

### Flow Overview

Customer views a provider's profile to see all their services and information.

```mermaid
flowchart TD
    A[View Service Details] --> B[Click Provider Name/Avatar]
    B --> C[Provider Profile Page]
    C --> D[View Provider Info]
    D --> E[View Provider Rating]
    E --> F[View All Provider Services]
    F --> G{Interested in Service?}
    G -->|Yes| H[Click Service]
    H --> I[View Service Details]
    G -->|No| J[Return to Browse]
```

---

## 7. Future Flows (Planned Features)

### Review & Rating Flow

1. Customer completes service
2. Receives review prompt
3. Submits rating (1-5 stars) and comment
4. Review appears on service and provider profile
5. Provider rating updated

### Direct Messaging Flow

1. Customer clicks "Message Provider"
2. Chat interface opens
3. Send message
4. Provider receives notification
5. Provider responds
6. Conversation continues in-app

### Saved Services Flow

1. Customer clicks "Save" on service card
2. Service added to favorites list
3. Access saved services from dashboard
4. View/compare saved services
5. Remove from saved list

### Promoted Listings Flow

1. Provider selects service to promote
2. Choose promotion duration
3. Payment processing (if applicable)
4. Service appears in promoted section
5. Increased visibility in search results

---

## User Flow Summary

### Key Interaction Points

| User Type                  | Primary Actions                             | Key Pages                                      |
| -------------------------- | ------------------------------------------- | ---------------------------------------------- |
| **Guest Customer**         | Browse services, view details               | Homepage, Services, Service Details            |
| **Authenticated Customer** | Browse, contact providers, save services    | Homepage, Services, Service Details, Dashboard |
| **Service Provider**       | Create/edit/delete services, manage profile | Dashboard, Services, Profile Edit              |
| **Admin** (Future)         | Moderate content, manage users              | Admin Dashboard                                |

### Navigation Patterns

**Guest Users:**

- Home → Services → Service Details → Login/Register → Contact

**Authenticated Customers:**

- Home → Services → Service Details → Contact Provider
- Dashboard → Saved Services → Service Details

**Service Providers:**

- Dashboard → Create Service → Manage Services
- Services → Offer Service → Service Created
- Dashboard → Edit Profile → Update Information

---

## Mobile vs Desktop Flows

### Mobile-Specific Considerations

- **Hamburger Menu:** Navigation collapsed into mobile menu
- **Filters:** Mobile filter drawer instead of sidebar
- **Touch Interactions:** Larger touch targets for buttons
- **Modal Forms:** Full-screen modals on mobile devices
- **Swipe Gestures:** Potential for swipe-based navigation (future)

### Desktop-Specific Features

- **Sidebar Navigation:** Persistent category sidebar
- **Hover States:** Rich hover interactions on service cards
- **Multi-Column Layouts:** Grid-based service display
- **Keyboard Shortcuts:** Potential for power-user features (future)

---

**Last Updated:** December 18, 2025
