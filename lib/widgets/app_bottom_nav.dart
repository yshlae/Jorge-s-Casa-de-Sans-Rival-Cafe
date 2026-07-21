// Custom bottom navigation bar matching the mockup exactly: the active
// tab's icon sits on a soft rounded coral backdrop, with its label also
// tinted coral; inactive tabs are plain muted icon + label. Flutter's
// stock BottomNavigationBar can't produce that active-icon backdrop on
// its own, so this is a small hand-built replacement.

import 'package:flutter/material.dart';
import '../config/theme.dart';

class AppBottomNavItem {
  final IconData icon;
  final String label;

  const AppBottomNavItem({required this.icon, required this.label});
}

class AppBottomNav extends StatelessWidget {
  final List<AppBottomNavItem> items;
  final int currentIndex;
  final ValueChanged<int> onTap;

  const AppBottomNav({
    super.key,
    required this.items,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: AppColors.cardBackgroundAlt,
        boxShadow: [
          BoxShadow(color: AppColors.cardShadow, blurRadius: 12, offset: Offset(0, -2)),
        ],
      ),
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: SafeArea(
        top: false,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            for (int i = 0; i < items.length; i++)
              _NavItem(
                item: items[i],
                isActive: i == currentIndex,
                onTap: () => onTap(i),
              ),
          ],
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final AppBottomNavItem item;
  final bool isActive;
  final VoidCallback onTap;

  const _NavItem({required this.item, required this.isActive, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
            decoration: BoxDecoration(
              color: isActive ? AppColors.coral.withValues(alpha: 0.15) : Colors.transparent,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              item.icon,
              size: 22,
              color: isActive ? AppColors.coral : AppColors.muted,
            ),
          ),
          const SizedBox(height: 3),
          Text(
            item.label,
            style: AppTextStyles.caption.copyWith(
              fontSize: 11,
              fontWeight: isActive ? FontWeight.w600 : FontWeight.w400,
              color: isActive ? AppColors.coral : AppColors.muted,
            ),
          ),
        ],
      ),
    );
  }
}