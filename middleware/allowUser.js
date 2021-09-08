export default function({ $auth, redirect }) {
  if ($auth.user.role !== "User") {
    return redirect("/admin");
  }
}
