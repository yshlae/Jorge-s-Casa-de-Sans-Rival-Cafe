// Owner shell — hosts the 5 tabs (Dashboard, Inventory, Resources, Reports,
// Profile) behind a single bottom nav bar.
//
// Each tab manages its own header/content (there's no shared top AppBar —
// looking at the screenshots, only the Dashboard tab has the "Jorge's Casa
// de Sans Rival / Enterprise Operations System" header; the others have
// their own distinct headers). IndexedStack keeps all 5 tabs alive so
// switching tabs doesn't lose scroll position or re-trigger loading.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/theme.dart';
import '../../state/inventory_state.dart' hide InventoryTab;
import '../../state/owner_dashboard_state.dart';
import '../../state/profile_state.dart';
import '../../state/reports_state.dart';
import '../../state/resources_state.dart';
import '../../widgets/app_bottom_nav.dart';
import 'dashboard_tab.dart';
import 'inventory_tab.dart';
import 'profile_tab.dart';
import 'reports_tab.dart';
import 'resources_tab.dart';

class OwnerHomeScreen extends StatefulWidget {
  const OwnerHomeScreen({super.key});

  @override
  State<OwnerHomeScreen> createState() => _OwnerHomeScreenState();
}

class _OwnerHomeScreenState extends State<OwnerHomeScreen> {
  int _tabIndex = 0;

  @override
  Widget build(BuildContext context) {
    // Scoped to this screen's lifetime — these states (and their Firestore
    // listeners) only exist while the Owner is logged in, and are torn
    // down automatically when OwnerHomeScreen is disposed (e.g. on logout).
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => OwnerDashboardState()),
        ChangeNotifierProvider(create: (_) => InventoryState()),
        ChangeNotifierProvider(create: (_) => ResourcesState()),
        ChangeNotifierProvider(create: (_) => ReportsState()),
        ChangeNotifierProvider(create: (_) => ProfileState()),
      ],
      child: Scaffold(
        backgroundColor: AppColors.background,
        body: SafeArea(
          child: IndexedStack(
            index: _tabIndex,
            children: const [
              DashboardTab(),
              InventoryTab(),
              ResourcesTab(),
              ReportsTab(),
              ProfileTab(),
            ],
          ),
        ),
        bottomNavigationBar: AppBottomNav(
          currentIndex: _tabIndex,
          onTap: (index) => setState(() => _tabIndex = index),
          items: const [
            AppBottomNavItem(icon: Icons.grid_view_rounded, label: 'Dashboard'),
            AppBottomNavItem(icon: Icons.inventory_2_outlined, label: 'Inventory'),
            AppBottomNavItem(icon: Icons.hub_outlined, label: 'Resources'),
            AppBottomNavItem(icon: Icons.description_outlined, label: 'Reports'),
            AppBottomNavItem(icon: Icons.person_outline, label: 'Profile'),
          ],
        ),
      ),
    );
  }
}