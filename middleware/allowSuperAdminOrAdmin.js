export default function({ $auth, redirect }) {
  if ($auth.user.role != "Super Admin" && $auth.user.role != "Admin") {
    return redirect("/admin/userdashbord");
  }
}
