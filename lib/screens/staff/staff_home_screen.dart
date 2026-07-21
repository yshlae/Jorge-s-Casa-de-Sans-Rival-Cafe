// Staff shell — hosts the 3 Staff screens behind a bottom nav bar.
//
// Unlike the Owner shell, this one uses a real shared AppBar (branch name
// + Logout) since there's no mockup dictating otherwise, and it avoids
// repeating a logout button on all three screens.
//
// StaffState is provided at the app level (see main.dart) rather than
// scoped here, since it's initialized once during login — before this
// screen even exists — via StaffState.initialize() in login_screen.dart.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/routes.dart';
import '../../config/theme.dart';
import '../../state/auth_state.dart';
import '../../state/staff_state.dart';
import '../../widgets/app_bottom_nav.dart';
import 'sales_snapshot_screen.dart';
import 'shift_stock_check_screen.dart';
import 'stock_adjustment_screen.dart';

class StaffHomeScreen extends StatefulWidget {
  const StaffHomeScreen({super.key});

  @override
  State<StaffHomeScreen> createState() => _StaffHomeScreenState();
}

class _StaffHomeScreenState extends State<StaffHomeScreen> {
  int _tabIndex = 0;

  @override
  Widget build(BuildContext context) {
    final branchName = context.watch<StaffState>().branchName ?? 'Staff';

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: Text(branchName),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
            onPressed: () {
              context.read<AuthState>().logout();
              Navigator.of(context).pushNamedAndRemoveUntil(
                AppRoutes.login,
                (route) => false,
              );
            },
          ),
        ],
      ),
      body: SafeArea(
        top: false,
        child: IndexedStack(
          index: _tabIndex,
          children: const [
            ShiftStockCheckScreen(),
            StockAdjustmentScreen(),
            SalesSnapshotScreen(),
          ],
        ),
      ),
      bottomNavigationBar: AppBottomNav(
        currentIndex: _tabIndex,
        onTap: (index) => setState(() => _tabIndex = index),
        items: const [
          AppBottomNavItem(icon: Icons.access_time_outlined, label: 'Shift'),
          AppBottomNavItem(icon: Icons.tune, label: 'Adjust Stock'),
          AppBottomNavItem(icon: Icons.point_of_sale_outlined, label: 'Sales'),
        ],
      ),
    );
  }
}