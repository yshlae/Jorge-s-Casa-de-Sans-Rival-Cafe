// Owner > Profile tab. Account info card (avatar, name, role, branch) plus
// an app Settings card (Dark Mode, Notifications) and a Logout button.

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import '../../config/routes.dart';
import '../../config/theme.dart';
import '../../models/branch.dart';
import '../../models/user.dart';
import '../../state/auth_state.dart';
import '../../state/owner_dashboard_state.dart';
import '../../state/profile_state.dart';

class ProfileTab extends StatelessWidget {
  const ProfileTab({super.key});

  @override
  Widget build(BuildContext context) {
    final authState = context.watch<AuthState>();
    final profileState = context.watch<ProfileState>();
    final user = authState.currentUser;

    // Reuses the branch list already loaded by OwnerDashboardState instead
    // of standing up a second BranchService listener just for this tab.
    final branches = context.watch<OwnerDashboardState>().branches;
    final branchName = user?.branchId == null
        ? 'All Branches'
        : branches
            .firstWhere(
              (b) => b.id == user!.branchId,
              orElse: () => const Branch(id: '', name: 'Unknown Branch'),
            )
            .name;

    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
      children: [
        Text('Profile', style: AppTextStyles.screenTitle),
        const SizedBox(height: 2),
        Text('Account and app settings', style: AppTextStyles.screenSubtitle),
        const SizedBox(height: 18),

        // --- Account card ---
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 20),
          decoration: AppDecorations.card(),
          child: Column(
            children: [
              // Gesture interaction #1 (GestureDetector): tap shows a photo
              // placeholder, long-press copies the account ID — two
              // distinct affordances on one widget, no ripple needed since
              // it's a plain circular avatar rather than a Material tile.
              GestureDetector(
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Profile photo upload — coming soon'),
                      duration: Duration(seconds: 2),
                    ),
                  );
                },
                onLongPress: () {
                  Clipboard.setData(ClipboardData(text: user?.id ?? ''));
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Account ID copied to clipboard'),
                      duration: Duration(seconds: 2),
                    ),
                  );
                },
                child: const _Avatar(),
              ),
              const SizedBox(height: 20),
              Text(
                user?.name ?? 'Unknown',
                style: AppTextStyles.screenTitle.copyWith(fontSize: 24),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 8),
              Text(
                user?.id ?? '—',
                style: AppTextStyles.body.copyWith(color: AppColors.muted, fontSize: 16),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              Text(
                'Enterprise Operations System',
                style: AppTextStyles.body.copyWith(color: AppColors.muted, fontSize: 15),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 18),
              _MembershipPill(role: user?.role ?? UserRole.staff, branchName: branchName),
            ],
          ),
        ),
        const SizedBox(height: 22),

        // --- Settings ---
        Text('Settings', style: AppTextStyles.sectionHeader),
        const SizedBox(height: 12),
        Container(
          decoration: AppDecorations.card(),
          child: Column(
            children: [
              _SettingsSwitchTile(
                icon: Icons.dark_mode_outlined,
                label: 'Dark Mode',
                value: profileState.darkModeEnabled,
                onChanged: profileState.setDarkModeEnabled,
              ),
              const Divider(height: 1, indent: 16, endIndent: 16),
              _SettingsSwitchTile(
                icon: Icons.notifications_outlined,
                label: 'Notifications',
                value: profileState.notificationsEnabled,
                onChanged: profileState.setNotificationsEnabled,
              ),
            ],
          ),
        ),
        const SizedBox(height: 22),

        // --- Logout ---
        OutlinedButton.icon(
          onPressed: () {
            context.read<AuthState>().logout();
            Navigator.of(context).pushNamedAndRemoveUntil(
              AppRoutes.login,
              (route) => false,
            );
          },
          icon: const Icon(Icons.logout, size: 16),
          label: const Text('Logout'),
          style: OutlinedButton.styleFrom(
            foregroundColor: AppColors.stockCriticalFg,
            side: const BorderSide(color: AppColors.stockCriticalFg),
            minimumSize: const Size.fromHeight(48),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(AppSpacing.buttonRadius),
            ),
          ),
        ),
      ],
    );
  }
}

class _Avatar extends StatelessWidget {
  const _Avatar();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 110,
      height: 110,
      decoration: const BoxDecoration(
        shape: BoxShape.circle,
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [AppColors.skyBlue, AppColors.coral],
        ),
      ),
      alignment: Alignment.center,
      child: const Icon(Icons.person, size: 56, color: AppColors.white),
    );
  }
}

class _MembershipPill extends StatelessWidget {
  final UserRole role;
  final String branchName;
  const _MembershipPill({required this.role, required this.branchName});

  @override
  Widget build(BuildContext context) {
    final isOwner = role == UserRole.owner;
    final label = isOwner ? 'Owner — $branchName' : 'Staff — $branchName';
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.lavenderBg,
        borderRadius: BorderRadius.circular(AppSpacing.chipRadius),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.verified, size: 18, color: AppColors.skyBlue),
          const SizedBox(width: 8),
          Text(
            label,
            style: AppTextStyles.bodyBold.copyWith(color: AppColors.skyBlue, fontSize: 14.5),
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }
}

class _SettingsSwitchTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool value;
  final ValueChanged<bool> onChanged;

  const _SettingsSwitchTile({
    required this.icon,
    required this.label,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    // Gesture interaction #2 (InkWell): the whole row is tappable — not
    // just the Switch thumb — and gives Material ripple feedback,
    // toggling the same value the Switch controls.
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => onChanged(!value),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            children: [
              Icon(icon, size: 20, color: AppColors.ink),
              const SizedBox(width: 12),
              Expanded(child: Text(label, style: AppTextStyles.body)),
              Switch(
                value: value,
                onChanged: onChanged,
                activeThumbColor: AppColors.coral,
              ),
            ],
          ),
        ),
      ),
    );
  }
}