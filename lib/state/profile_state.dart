// Backs the Owner > Profile tab: app-level settings (dark mode,
// notifications). These are in-memory only for now — they reset on
// logout/app restart. Wire up `shared_preferences` (or a Firestore
// `user_settings` doc) here later if you want them to persist.

import 'package:flutter/material.dart';

class ProfileState extends ChangeNotifier {
  bool _darkModeEnabled = false;
  bool _notificationsEnabled = true;

  bool get darkModeEnabled => _darkModeEnabled;
  bool get notificationsEnabled => _notificationsEnabled;

  /// Convenience for `MaterialApp(themeMode: profileState.themeMode)`.
  ThemeMode get themeMode => _darkModeEnabled ? ThemeMode.dark : ThemeMode.light;

  void setDarkModeEnabled(bool value) {
    _darkModeEnabled = value;
    notifyListeners();
    // See the caveat above buildAppDarkTheme() in config/theme.dart —
    // this flips the app's brightness, but custom widgets that read
    // AppColors.xxx directly won't recolor until they're migrated too.
  }

  void setNotificationsEnabled(bool value) {
    _notificationsEnabled = value;
    notifyListeners();
  }
}