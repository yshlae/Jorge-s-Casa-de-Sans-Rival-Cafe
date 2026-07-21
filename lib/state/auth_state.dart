// Tracks the currently logged-in user and drives the Login screen.
//
// This app has no real authentication backend — the Login screen's demo
// credentials (shown in the mockup: admin@jorgescafe.com / admin123) are
// checked against a small local map here, then the *real* user record
// (role, branchId) is loaded from Firestore so the rest of the app still
// has a single source of truth for who this user is.

import 'package:flutter/foundation.dart';
import '../models/user.dart';
import '../services/user_service.dart';

class _DemoCredential {
  final String password;
  final String userId;
  const _DemoCredential({required this.password, required this.userId});
}

class AuthState extends ChangeNotifier {
  final UserService _userService = UserService();

  AppUser? _currentUser;
  bool _isLoading = false;
  String? _errorMessage;

  AppUser? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isLoggedIn => _currentUser != null;

  static const Map<String, _DemoCredential> _demoCredentials = {
    'admin@jorgescafe.com': _DemoCredential(
      password: 'admin123',
      userId: 'owner_1',
    ),
    'staff@jorgescafe.com': _DemoCredential(
      password: 'staff_al123',
      userId: 'staff_alangilan',
    ),
    'staff.lipa@jorgescafe.com': _DemoCredential(
      password: 'staff_lp123',
      userId: 'staff_lipa',
    ),
  };

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    final credential = _demoCredentials[email.trim().toLowerCase()];
    if (credential == null || credential.password != password) {
      _isLoading = false;
      _errorMessage = 'Invalid email or password.';
      notifyListeners();
      return false;
    }

    try {
      final user = await _userService.fetchUserById(credential.userId);
      if (user == null) {
        _isLoading = false;
        _errorMessage =
            'Account not found in Firestore. Did you run seedFirestore()?';
        notifyListeners();
        return false;
      }
      _currentUser = user;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Something went wrong. Please try again.';
      notifyListeners();
      return false;
    }
  }

  void logout() {
    _currentUser = null;
    notifyListeners();
  }
}
