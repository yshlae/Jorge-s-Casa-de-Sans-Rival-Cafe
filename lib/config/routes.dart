class AppRoutes {
  AppRoutes._();

  static const String splash = '/splash';
  static const String login = '/login';

  // Owner flow — single shell route; internal tabs handled by IndexedStack
  static const String ownerHome = '/owner/home';

  // Staff flow — separate simple screens (no mockup provided for these)
  static const String staffHome = '/staff/home';
  static const String shiftStockCheck = '/staff/shift';
  static const String stockAdjustment = '/staff/adjust-stock';
  static const String salesSnapshot = '/staff/sales-snapshot';
}