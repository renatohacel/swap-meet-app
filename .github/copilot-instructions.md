# Tianguis Web Application - Copilot Instructions

## Architecture Overview
- **Monorepo structure**: `back/` (Node.js/Express API) + `front/` (React/Vite SPA)
- **Database**: SQL Server with Sequelize ORM using stored procedures (`usp_*`)
- **Authentication**: JWT tokens stored in HTTP-only cookies
- **Frontend**: React + Ant Design + Tailwind CSS + React Router

## Backend Patterns

### Controller Structure
Controllers use static class methods following this pattern:
```javascript
export class MyController {
    static async methodName(req, res) {
        const { id } = req.params;
        const executeBy = req.user.Usuario; // From JWT middleware
        try {
            const result = await MyModel.methodName(id, executeBy);
            if (result?.Error) return res.status(409).send({ message: result.Error });
            res.status(200).send(result);
        } catch (error) {
            console.error("Error in MyController.methodName:", error);
            res.status(500).send({ error: 'Descriptive error message' });
        }
    }
}
```

### Model Patterns
Models use Sequelize with raw SQL queries calling stored procedures:
```javascript
export class MyModel {
    static async methodName(param) {
        const sql = `exec usp_StoredProcedure @param = :param`;
        const result = await sequelize.query(sql, { replacements: { param } });
        return result[0];
    }
}
```

### Report Generation
Excel reports use ExcelJS with templates from `templates/` directory. PDF reports use pdf-lib. Standard pattern:
1. Fetch data from model
2. Load template or create PDF document
3. Set response headers with filename
4. Stream buffer to response

## Frontend Patterns

### Component Structure
- Use custom hooks (e.g., `useGenLoteTarjetas`) for business logic
- Implement polling with `usePolling(callback, interval)` for real-time updates
- Permission checks with `usePermissions().can(module, action, resource)`

### State Management
- Local state with useState/useEffect
- API calls via `axiosInstance` (pre-configured with cookies)
- Toast notifications with `react-hot-toast`

### UI Components
- Ant Design components with custom styling
- Custom components in `modules/ui/components/`
- Tailwind CSS for utility classes
- Modals for loading states use `styles.header` and `styles.body` (not deprecated `bodyStyle`)

## Development Commands
```bash
# Backend
cd back && npm run dev    # Nodemon on port 3000

# Frontend  
cd front && npm run dev   # Vite dev server on port 5173
```

## Key Conventions
- Controllers handle auth via `req.user` from JWT middleware
- Database uses stored procedures exclusively (no ORM models)
- Error responses include descriptive Spanish messages
- File uploads use Multer middleware
- Static files served from `back/src/templates/media/`
- Frontend routes use React Router with protected routes pattern