// Local fallback data — used ONLY when Firestore is unreachable (see
// utils/stream_fallback.dart). Values here deliberately mirror
// seed_data.dart exactly, so the app looks identical whether it's reading
// from Firestore or running fully offline during a demo.

import '../models/branch.dart';
import '../models/branch_performance.dart';
import '../models/dashboard_metrics.dart';
import '../models/inventory_item.dart';
import '../models/recent_order.dart';
import '../models/report_summary.dart';
import '../models/resource_recommendation.dart';
import '../models/sales_summary.dart';
import '../models/stock_adjustment_log.dart';
import '../models/user.dart';

const List<Branch> mockBranches = [
  Branch(id: 'batangas_city', name: 'Batangas City'),
  Branch(id: 'lipa', name: 'Lipa'),
  Branch(id: 'alangilan', name: 'Alangilan'),
];

const Map<String, AppUser> mockUsersById = {
  'owner_1': AppUser(id: 'owner_1', name: 'Admin', role: UserRole.owner),
  'staff_alangilan': AppUser(
    id: 'staff_alangilan',
    name: 'Maria S.',
    role: UserRole.staff,
    branchId: 'alangilan',
  ),
  'staff_lipa': AppUser(
    id: 'staff_lipa',
    name: 'Mark K.',
    role: UserRole.staff,
    branchId: 'lipa',
  ),
};

BranchPerformance? mockBranchPerformanceForBranch(String branchId) {
  try {
    return mockBranchPerformance.firstWhere((b) => b.branchId == branchId);
  } catch (_) {
    return null;
  }
}

const List<BranchPerformance> mockBranchPerformance = [
  BranchPerformance(
    branchId: 'batangas_city',
    branchName: 'Batangas City',
    tagline: 'Main Branch',
    revenue: 45680.0,
    productionUnits: 1542,
    orderCount: 285, id: '',
  ),
  BranchPerformance(
    branchId: 'lipa',
    branchName: 'Lipa',
    tagline: 'Second Branch',
    revenue: 32450.0,
    productionUnits: 1124,
    orderCount: 198, id: '',
  ),
  BranchPerformance(
    branchId: 'alangilan',
    branchName: 'Alangilan',
    tagline: 'Third Branch',
    revenue: 38920.0,
    productionUnits: 1347,
    orderCount: 243, id: '',
  ),
];

const DashboardMetrics mockDashboardMetrics = DashboardMetrics(
  totalRevenue: 125150.0,
  revenueChangePercent: 12.5,
  productionOutput: 4013,
  productionChangePercent: 8.3,
  demandForecast: ForecastLevel.high,
  demandForecastChangePercent: 15.2,
  resourceStatusPercent: 87,
  criticalResourceCount: 2,
);

const List<RecentOrder> mockRecentOrders = [
  RecentOrder(
    id: 'order_2041',
    orderNumber: '#2041',
    branchName: 'Batangas City',
    itemSummary: 'Classic Sans Rival x2',
    amount: 1700.0,
    status: OrderStatus.delivered,
  ),
  RecentOrder(
    id: 'order_2040',
    orderNumber: '#2040',
    branchName: 'Alangilan',
    itemSummary: 'Mini Sans Rival Box x3',
    amount: 1140.0,
    status: OrderStatus.preparing,
  ),
  RecentOrder(
    id: 'order_2039',
    orderNumber: '#2039',
    branchName: 'Lipa',
    itemSummary: 'Pistachio Sans Rival',
    amount: 450.0,
    status: OrderStatus.pending,
  ),
  RecentOrder(
    id: 'order_2038',
    orderNumber: '#2038',
    branchName: 'Alangilan',
    itemSummary: 'Almond Sans Rival x1',
    amount: 550.0,
    status: OrderStatus.delivered,
  ),
  RecentOrder(
    id: 'order_2037',
    orderNumber: '#2037',
    branchName: 'Batangas City',
    itemSummary: 'Ube Sans Rival x4',
    amount: 2200.0,
    status: OrderStatus.delivered,
  ),
  RecentOrder(
    id: 'order_2036',
    orderNumber: '#2036',
    branchName: 'Lipa',
    itemSummary: 'Dark Chocolate Sans Rival x2',
    amount: 900.0,
    status: OrderStatus.preparing,
  ),
];

const List<InventoryItem> mockInventoryItems = [
  // Products
  InventoryItem(
    id: 'inv_classic_sans_rival',
    name: 'Classic Sans Rival',
    branchId: 'batangas_city',
    category: InventoryCategory.product,
    unit: 'pcs',
    currentStock: 24,
    reorderThreshold: 10,
  ),
  InventoryItem(
    id: 'inv_pistachio_sans_rival',
    name: 'Pistachio Sans Rival',
    branchId: 'lipa',
    category: InventoryCategory.product,
    unit: 'pcs',
    currentStock: 8,
    reorderThreshold: 10,
  ),
  InventoryItem(
    id: 'inv_chocolate_sans_rival',
    name: 'Chocolate Sans Rival',
    branchId: 'alangilan',
    category: InventoryCategory.product,
    unit: 'pcs',
    currentStock: 15,
    reorderThreshold: 8,
  ),
  InventoryItem(
    id: 'inv_mini_sans_rival_box',
    name: 'Mini Sans Rival Box',
    branchId: 'alangilan',
    category: InventoryCategory.product,
    unit: 'boxes',
    currentStock: 3,
    reorderThreshold: 5,
  ),
  InventoryItem(
    id: 'inv_mixed_nuts',
    name: 'Mixed Nuts',
    branchId: 'batangas_city',
    category: InventoryCategory.product,
    unit: 'jars',
    currentStock: 40,
    reorderThreshold: 15,
  ),
  InventoryItem(
    id: 'inv_dark_chocolate_sans_rival',
    name: 'Dark Chocolate Sans Rival',
    branchId: 'lipa',
    category: InventoryCategory.product,
    unit: 'pcs',
    currentStock: 6,
    reorderThreshold: 8,
  ),
  InventoryItem(
    id: 'inv_ube_sans_rival',
    name: 'Ube Sans Rival',
    branchId: 'batangas_city',
    category: InventoryCategory.product,
    unit: 'pcs',
    currentStock: 20,
    reorderThreshold: 10,
  ),
  InventoryItem(
    id: 'inv_almond_sans_rival',
    name: 'Almond Sans Rival',
    branchId: 'alangilan',
    category: InventoryCategory.product,
    unit: 'pcs',
    currentStock: 5,
    reorderThreshold: 8,
  ),
  // Raw Materials
  InventoryItem(
    id: 'inv_cashews_raw',
    name: 'Cashews (raw)',
    branchId: 'batangas_city',
    category: InventoryCategory.rawMaterial,
    unit: 'kg',
    currentStock: 12,
    reorderThreshold: 5,
  ),
  InventoryItem(
    id: 'inv_butter',
    name: 'Butter',
    branchId: 'alangilan',
    category: InventoryCategory.rawMaterial,
    unit: 'kg',
    currentStock: 2,
    reorderThreshold: 4,
  ),
  InventoryItem(
    id: 'inv_eggs',
    name: 'Eggs',
    branchId: 'batangas_city',
    category: InventoryCategory.rawMaterial,
    unit: 'pcs',
    currentStock: 60,
    reorderThreshold: 24,
  ),
  InventoryItem(
    id: 'inv_sugar',
    name: 'Sugar',
    branchId: 'alangilan',
    category: InventoryCategory.rawMaterial,
    unit: 'kg',
    currentStock: 8,
    reorderThreshold: 5,
  ),
  InventoryItem(
    id: 'inv_pistachio_raw',
    name: 'Pistachio (raw)',
    branchId: 'lipa',
    category: InventoryCategory.rawMaterial,
    unit: 'kg',
    currentStock: 4,
    reorderThreshold: 3,
  ),
  InventoryItem(
    id: 'inv_condensed_milk',
    name: 'Condensed Milk',
    branchId: 'batangas_city',
    category: InventoryCategory.rawMaterial,
    unit: 'cans',
    currentStock: 30,
    reorderThreshold: 12,
  ),
  InventoryItem(
    id: 'inv_vanilla_extract',
    name: 'Vanilla Extract',
    branchId: 'lipa',
    category: InventoryCategory.rawMaterial,
    unit: 'bottles',
    currentStock: 3,
    reorderThreshold: 5,
  ),
  InventoryItem(
    id: 'inv_flour',
    name: 'Flour',
    branchId: 'alangilan',
    category: InventoryCategory.rawMaterial,
    unit: 'kg',
    currentStock: 0,
    reorderThreshold: 10,
  ),
];

List<InventoryItem> mockInventoryItemsForBranch(String branchId) =>
    mockInventoryItems.where((i) => i.branchId == branchId).toList();

/// Timestamps are computed relative to "now" (can't be const) so they
/// still look like a recent activity log no matter when the demo runs.
List<StockAdjustmentLog> buildMockAdjustmentLogs() {
  final now = DateTime.now();
  return [
    StockAdjustmentLog(
      id: 'adj_1',
      itemName: 'Cashews (raw)',
      branchName: 'Batangas City',
      type: AdjustmentType.restock,
      amount: 10,
      unit: 'kg',
      staffName: 'Juan D.',
      timestamp: now.subtract(const Duration(hours: 2)),
    ),
    StockAdjustmentLog(
      id: 'adj_2',
      itemName: 'Classic Sans Rival',
      branchName: 'Alangilan',
      type: AdjustmentType.deduction,
      amount: 4,
      unit: 'pcs',
      staffName: 'Maria S.',
      timestamp: now.subtract(const Duration(hours: 2, minutes: 17)),
    ),
    StockAdjustmentLog(
      id: 'adj_3',
      itemName: 'Butter',
      branchName: 'Lipa',
      type: AdjustmentType.restock,
      amount: 5,
      unit: 'kg',
      staffName: 'Admin',
      timestamp: now.subtract(const Duration(days: 1, hours: 3)),
    ),
    StockAdjustmentLog(
      id: 'adj_4',
      itemName: 'Eggs',
      branchName: 'Batangas City',
      type: AdjustmentType.deduction,
      amount: 12,
      unit: 'pcs',
      staffName: 'Carlo M.',
      timestamp: now.subtract(const Duration(days: 1, hours: 5, minutes: 20)),
    ),
    StockAdjustmentLog(
      id: 'adj_5',
      itemName: 'Mini Sans Rival Box',
      branchName: 'Alangilan',
      type: AdjustmentType.restock,
      amount: 8,
      unit: 'boxes',
      staffName: 'Admin',
      timestamp: now.subtract(const Duration(days: 1, hours: 7, minutes: 30)),
    ),
    StockAdjustmentLog(
      id: 'adj_6',
      itemName: 'Dark Chocolate',
      branchName: 'Lipa',
      type: AdjustmentType.deduction,
      amount: 2,
      unit: 'kg',
      staffName: 'Maria S.',
      timestamp: now.subtract(const Duration(days: 1, hours: 9)),
    ),
    StockAdjustmentLog(
      id: 'adj_7',
      itemName: 'Ube Sans Rival',
      branchName: 'Batangas City',
      type: AdjustmentType.restock,
      amount: 15,
      unit: 'pcs',
      staffName: 'Juan D.',
      timestamp: now.subtract(const Duration(days: 2, hours: 1)),
    ),
    StockAdjustmentLog(
      id: 'adj_8',
      itemName: 'Flour',
      branchName: 'Alangilan',
      type: AdjustmentType.deduction,
      amount: 10,
      unit: 'kg',
      staffName: 'Maria S.',
      timestamp: now.subtract(const Duration(hours: 6)),
    ),
    StockAdjustmentLog(
      id: 'adj_9',
      itemName: 'Condensed Milk',
      branchName: 'Batangas City',
      type: AdjustmentType.restock,
      amount: 20,
      unit: 'cans',
      staffName: 'Admin',
      timestamp: now.subtract(const Duration(days: 3, hours: 2)),
    ),
    StockAdjustmentLog(
      id: 'adj_10',
      itemName: 'Almond Sans Rival',
      branchName: 'Alangilan',
      type: AdjustmentType.deduction,
      amount: 3,
      unit: 'pcs',
      staffName: 'Maria S.',
      timestamp: now.subtract(const Duration(days: 1, hours: 1)),
    ),
  ];
}

const List<ResourceRecommendation> mockResourceRecommendations = [
  ResourceRecommendation(
    id: 'rec_butter',
    resourceName: 'Butter',
    urgency: Urgency.urgent,
    actionTitle: 'Restock immediately',
    detail:
        'Only 2 kg left — projected to run out in 1 day based on current production rate.',
    quantityLabel: 'Order 10 kg',
    actionButtonLabel: 'Order Now',
  ),
  ResourceRecommendation(
    id: 'rec_packaging_machine',
    resourceName: 'Packaging Machine',
    urgency: Urgency.urgent,
    actionTitle: 'Schedule maintenance',
    detail:
        'Unit #2 has been offline 3 days. Throughput down 48%. Recommend service call today.',
    quantityLabel: '1 unit offline',
    actionButtonLabel: 'Restock Now',
  ),
  ResourceRecommendation(
    id: 'rec_cashew_supply',
    resourceName: 'Cashew Supply',
    urgency: Urgency.soon,
    actionTitle: 'Restock within 3 days',
    detail:
        'Current stock covers 4 more days. Supplier lead time is 2 days — order soon.',
    quantityLabel: 'Order 25 kg',
    actionButtonLabel: 'Order Now',
  ),
  ResourceRecommendation(
    id: 'rec_delivery_fleet',
    resourceName: 'Delivery Fleet',
    urgency: Urgency.soon,
    actionTitle: 'Add temporary vehicle',
    detail:
        'Peak weekend orders expected. Fleet at 67% — consider 1 additional rental Fri-Sun.',
    quantityLabel: '2 vehicles available',
    actionButtonLabel: 'Order Now',
  ),
  ResourceRecommendation(
    id: 'rec_flour',
    resourceName: 'Flour',
    urgency: Urgency.urgent,
    actionTitle: 'Restock immediately',
    detail:
        'Out of stock — production of Ube and other flour-based items halted.',
    quantityLabel: 'Order 20 kg',
    actionButtonLabel: 'Order Now',
  ),
  ResourceRecommendation(
    id: 'rec_staff_coverage',
    resourceName: 'Weekend Staff Coverage',
    urgency: Urgency.soon,
    actionTitle: 'Schedule additional shift',
    detail:
        'Projected 30% higher foot traffic this weekend based on historical trends.',
    quantityLabel: '2 staff needed',
    actionButtonLabel: 'Schedule Now',
  ),
];

const ReportSummary mockMonthlyReport = ReportSummary(
  period: ReportPeriod.monthly,
  totalRevenue: 125150.0,
  revenueChangePercent: 12.5,
  totalOrders: 726,
  orderChangePercent: 8.3,
  branchBreakdown: [
    BranchBreakdownEntry(branchName: 'Batangas City', amount: 45680.0, percent: 39.0),
    BranchBreakdownEntry(branchName: 'Lipa', amount: 32450.0, percent: 28.0),
    BranchBreakdownEntry(branchName: 'Alangilan', amount: 38920.0, percent: 33.0),
  ],
);

const ReportSummary mockWeeklyReport = ReportSummary(
  period: ReportPeriod.weekly,
  totalRevenue: 28800.0,
  revenueChangePercent: 5.1,
  totalOrders: 167,
  orderChangePercent: 3.4,
  branchBreakdown: [
    BranchBreakdownEntry(branchName: 'Batangas City', amount: 10500.0, percent: 39.0),
    BranchBreakdownEntry(branchName: 'Lipa', amount: 7450.0, percent: 28.0),
    BranchBreakdownEntry(branchName: 'Alangilan', amount: 8950.0, percent: 33.0),
  ],
);

/// Now covers all 3 branches, mirroring seed_data.dart's sales_summaries.
List<SalesSummary> mockSalesSummariesForBranch(String branchId) {
  switch (branchId) {
    case 'alangilan':
      return [
        SalesSummary(
          id: 'sales_alangilan_today',
          branchId: 'alangilan',
          date: DateTime.now(),
          revenue: 8450.0,
          transactionCount: 42,
          topProducts: const [
            TopProduct(name: 'Classic Sans Rival', amount: 8200.0),
            TopProduct(name: 'Mini Sans Rival Box', amount: 1140.0),
            TopProduct(name: 'Almond Sans Rival', amount: 550.0),
          ],
          revenueChangePercent: 9.4,
          hourlyBreakdown: const [
            HourlySales(hour: 8, revenue: 420.0),
            HourlySales(hour: 10, revenue: 980.0),
            HourlySales(hour: 12, revenue: 1850.0),
            HourlySales(hour: 14, revenue: 1420.0),
            HourlySales(hour: 16, revenue: 2100.0),
            HourlySales(hour: 18, revenue: 1680.0),
          ],
        ),
      ];
    case 'batangas_city':
      return [
        SalesSummary(
          id: 'sales_batangas_city_today',
          branchId: 'batangas_city',
          date: DateTime.now(),
          revenue: 6200.0,
          transactionCount: 31,
          topProducts: const [
            TopProduct(name: 'Ube Sans Rival', amount: 3100.0),
            TopProduct(name: 'Classic Sans Rival', amount: 1700.0),
            TopProduct(name: 'Mixed Nuts', amount: 900.0),
          ],
          revenueChangePercent: -3.1,
          hourlyBreakdown: const [
            HourlySales(hour: 8, revenue: 310.0),
            HourlySales(hour: 10, revenue: 720.0),
            HourlySales(hour: 12, revenue: 1340.0),
            HourlySales(hour: 14, revenue: 980.0),
            HourlySales(hour: 16, revenue: 1550.0),
            HourlySales(hour: 18, revenue: 1300.0),
          ],
        ),
      ];
    case 'lipa':
      return [
        SalesSummary(
          id: 'sales_lipa_today',
          branchId: 'lipa',
          date: DateTime.now(),
          revenue: 4100.0,
          transactionCount: 22,
          topProducts: const [
            TopProduct(name: 'Dark Chocolate Sans Rival', amount: 1800.0),
            TopProduct(name: 'Pistachio Sans Rival', amount: 1450.0),
            TopProduct(name: 'Vanilla Extract Special', amount: 850.0),
          ],
          revenueChangePercent: 5.7,
          hourlyBreakdown: const [
            HourlySales(hour: 8, revenue: 210.0),
            HourlySales(hour: 10, revenue: 480.0),
            HourlySales(hour: 12, revenue: 890.0),
            HourlySales(hour: 14, revenue: 720.0),
            HourlySales(hour: 16, revenue: 1050.0),
            HourlySales(hour: 18, revenue: 750.0),
          ],
        ),
      ];
    default:
      return [];
  }
}