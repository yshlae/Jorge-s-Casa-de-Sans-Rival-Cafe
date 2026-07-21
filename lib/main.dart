// App entry point.
//
// Wires together: Firebase initialization, the two app-lifetime state
// providers (AuthState + StaffState — both need to survive the
// login → home navigation, unlike the Owner's 4 tab states which are
// scoped locally inside owner_home_screen.dart), and the route table.

import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sanserveall_mobile/data/seed_data.dart';

import 'config/firebase_options.dart';
import 'config/routes.dart';
import 'config/theme.dart';
import 'screens/auth/login_screen.dart';
import 'screens/auth/splash_screen.dart';
import 'screens/owner/owner_home_screen.dart';
import 'screens/staff/staff_home_screen.dart';
import 'state/auth_state.dart';
import 'state/staff_state.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Firebase MUST finish initializing before anything else touches
  // Firestore (seedFirestore included) — so this is properly awaited,
  // not fire-and-forgotten.
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  // ── ONE-TIME SEED ──────────────────────────────────────────────────
  // Uncomment the line below, run the app once, then comment it back out.
  // This populates Firestore with the sample data from seed_data.dart
  // (branches, users, inventory, recent orders, etc.) so the app has
  // something to show. Safe to re-run — it overwrites the same doc IDs.
  //
  await seedFirestore();
  // ────────────────────────────────────────────────────────────────────

  runApp(const SanServeAllApp());
}

class SanServeAllApp extends StatelessWidget {
  const SanServeAllApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        // App-lifetime state: created once, survives the login → home
        // navigation. Owner's 4 tab states are intentionally NOT here —
        // they're scoped inside OwnerHomeScreen so their Firestore
        // listeners only run while the Owner is actually logged in.
        ChangeNotifierProvider(create: (_) => AuthState()),
        ChangeNotifierProvider(create: (_) => StaffState()),
      ],
      child: MaterialApp(
        title: 'SanServeAll Mobile',
        debugShowCheckedModeBanner: false,
        theme: buildAppTheme(),
        initialRoute: AppRoutes.splash,
        routes: {
          AppRoutes.splash: (_) => const SplashScreen(),
          AppRoutes.login: (_) => const LoginScreen(),
          AppRoutes.ownerHome: (_) => const OwnerHomeScreen(),
          AppRoutes.staffHome: (_) => const StaffHomeScreen(),
        },
      ),
    );
  }
}