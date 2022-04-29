export default function({ $auth, next, $toast, redirect }) {
    if ($auth.user && $auth.user.role.name !== 'admin') {
        $toast.error('You must be an admin to view that page!')
        next('/')
    } 
}