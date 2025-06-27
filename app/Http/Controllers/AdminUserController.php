<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
  // List all users
  public function index()
  {
    $users = User::select('id', 'name', 'email', 'created_at', 'is_admin')->orderBy('created_at', 'desc')->get();
    return Inertia::render('admin/users', [
      'users' => $users,
    ]);
  }

  // Show user detail
  public function show($id)
  {
    $user = User::select('id', 'name', 'email', 'created_at', 'is_admin')->findOrFail($id);
    return Inertia::render('admin/user-detail', [
      'user' => $user,
    ]);
  }

  // Delete user
  public function destroy($id)
  {
    $user = User::findOrFail($id);
    $user->delete();
    return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
  }
}
