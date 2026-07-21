// One-time seed script — pushes sample documents into Firestore so the
// prototype has data to show without building an admin panel first.
//
// Values below are taken directly from the Figma mockup screenshots
// (Dashboard, Inventory, Resources, Reports) so the seeded app looks
// exactly like the reference designs on first run.
//
// Run this once (e.g. call `seedFirestore()` from a temporary button in
// main.dart during development) after your Firebase project is connected.
// Safe to re-run — it overwrites the same doc IDs.

import 'package:cloud_firestore/cloud_firestore.dart';

Future<void> seedFirestore() async {
  final db = FirebaseFirestore.instance;

  // --- Branches ---
  final branches = {
    'batangas_city': 'Batangas City',
    'lipa': 'Lipa',
    'alangilan': 'Alangilan',
  };
  for (final entry in branches.entries) {
    await db.collection('branches').doc(entry.key).set({'name': entry.value});
  }

  // --- Users (mock accounts, no real auth) ---
  await db.collection('users').doc('owner_1').set({
    'name': 'Jape J.',
    'role': 'owner',
    'branchId': 'alangilan',
  });
  await db.collection('users').doc('staff_lipa').set({
    'name': 'Mark K.',
    'role': 'staff',
    'branchId': 'lipa',
  });
  await db.collection('users').doc('staff_alangilan').set({
    'name': 'Maria S.',
    'role': 'staff',
    'branchId': 'alangilan',
  });

  // --- Branch performance (Dashboard "Branch Performance" cards) ---
  final branchPerformance = [
    {
      'id': 'batangas_city',
      'branchName': 'Batangas City',
      'tagline': 'Main Branch',
      'revenue': 45680.0,
      'productionUnits': 1542,
      'orderCount': 285,
    },
    {
      'id': 'lipa',
      'branchName': 'Lipa',
      'tagline': 'Second Branch',
      'revenue': 32450.0,
      'productionUnits': 1124,
      'orderCount': 198,
    },
    {
      'id': 'alangilan',
      'branchName': 'Alangilan',
      'tagline': 'Third Branch',
      'revenue': 38920.0,
      'productionUnits': 1347,
      'orderCount': 243,
    },
  ];
  for (final b in branchPerformance) {
    final id = b['id'] as String;
    final data = Map<String, dynamic>.from(b)..remove('id');
    data['branchId'] = id;
    await db.collection('branch_performance').doc(id).set(data);
  }

  // --- Dashboard metrics (Key Metrics 2x2 grid, single doc) ---
  await db.collection('dashboard_metrics').doc('current').set({
    'totalRevenue': 125150.0,
    'revenueChangePercent': 12.5,
    'productionOutput': 4013,
    'productionChangePercent': 8.3,
    'demandForecast': 'high',
    'demandForecastChangePercent': 15.2,
    'resourceStatusPercent': 87,
    'criticalResourceCount': 2,
  });

  // --- Recent orders (Dashboard "Recent Orders" list) ---
  final recentOrders = [
    {
      'id': 'order_2041',
      'orderNumber': '#2041',
      'branchName': 'Batangas City',
      'itemSummary': 'Classic Sans Rival x2',
      'amount': 1700.0,
      'status': 'delivered',
      'sortIndex': 2041,
    },
    {
      'id': 'order_2040',
      'orderNumber': '#2040',
      'branchName': 'Alangilan',
      'itemSummary': 'Mini Sans Rival Box x3',
      'amount': 1140.0,
      'status': 'preparing',
      'sortIndex': 2040,
    },
    {
      'id': 'order_2039',
      'orderNumber': '#2039',
      'branchName': 'Lipa',
      'itemSummary': 'Pistachio Sans Rival',
      'amount': 450.0,
      'status': 'pending',
      'sortIndex': 2039,
    },
    {
      'id': 'order_2038',
      'orderNumber': '#2038',
      'branchName': 'Alangilan',
      'itemSummary': 'Almond Sans Rival x1',
      'amount': 550.0,
      'status': 'delivered',
      'sortIndex': 2038,
    },
    {
      'id': 'order_2037',
      'orderNumber': '#2037',
      'branchName': 'Batangas City',
      'itemSummary': 'Ube Sans Rival x4',
      'amount': 2200.0,
      'status': 'delivered',
      'sortIndex': 2037,
    },
    {
      'id': 'order_2036',
      'orderNumber': '#2036',
      'branchName': 'Lipa',
      'itemSummary': 'Dark Chocolate Sans Rival x2',
      'amount': 900.0,
      'status': 'preparing',
      'sortIndex': 2036,
    },
  ];
  for (final o in recentOrders) {
    final id = o['id'] as String;
    final data = Map<String, dynamic>.from(o)..remove('id');
    await db.collection('recent_orders').doc(id).set(data);
  }

  // --- Inventory: Products (Inventory > Products tab) ---
  final productItems = [
    {
      'id': 'inv_classic_sans_rival',
      'name': 'Classic Sans Rival',
      'branchId': 'batangas_city',
      'category': 'product',
      'unit': 'pcs',
      'currentStock': 24,
      'reorderThreshold': 10,
    },
    {
      'id': 'inv_pistachio_sans_rival',
      'name': 'Pistachio Sans Rival',
      'branchId': 'lipa',
      'category': 'product',
      'unit': 'pcs',
      'currentStock': 8,
      'reorderThreshold': 10,
    },
    {
      'id': 'inv_chocolate_sans_rival',
      'name': 'Chocolate Sans Rival',
      'branchId': 'alangilan',
      'category': 'product',
      'unit': 'pcs',
      'currentStock': 15,
      'reorderThreshold': 8,
    },
    {
      'id': 'inv_mini_sans_rival_box',
      'name': 'Mini Sans Rival Box',
      'branchId': 'alangilan',
      'category': 'product',
      'unit': 'boxes',
      'currentStock': 3,
      'reorderThreshold': 5,
    },
    {
      'id': 'inv_mixed_nuts',
      'name': 'Mixed Nuts',
      'branchId': 'batangas_city',
      'category': 'product',
      'unit': 'jars',
      'currentStock': 40,
      'reorderThreshold': 15,
    },
    {
      'id': 'inv_dark_chocolate_sans_rival',
      'name': 'Dark Chocolate Sans Rival',
      'branchId': 'lipa',
      'category': 'product',
      'unit': 'pcs',
      'currentStock': 6,
      'reorderThreshold': 8,
    },
    {
      'id': 'inv_ube_sans_rival',
      'name': 'Ube Sans Rival',
      'branchId': 'batangas_city',
      'category': 'product',
      'unit': 'pcs',
      'currentStock': 20,
      'reorderThreshold': 10,
    },
    {
      'id': 'inv_almond_sans_rival',
      'name': 'Almond Sans Rival',
      'branchId': 'alangilan',
      'category': 'product',
      'unit': 'pcs',
      'currentStock': 5,
      'reorderThreshold': 8,
    },
  ];

  // --- Inventory: Raw Materials (Inventory > Raw Materials tab) ---
  final rawMaterialItems = [
    {
      'id': 'inv_cashews_raw',
      'name': 'Cashews (raw)',
      'branchId': 'batangas_city',
      'category': 'rawMaterial',
      'unit': 'kg',
      'currentStock': 12,
      'reorderThreshold': 5,
    },
    {
      'id': 'inv_butter',
      'name': 'Butter',
      'branchId': 'alangilan',
      'category': 'rawMaterial',
      'unit': 'kg',
      'currentStock': 2,
      'reorderThreshold': 4,
    },
    {
      'id': 'inv_eggs',
      'name': 'Eggs',
      'branchId': 'batangas_city',
      'category': 'rawMaterial',
      'unit': 'pcs',
      'currentStock': 60,
      'reorderThreshold': 24,
    },
    {
      'id': 'inv_sugar',
      'name': 'Sugar',
      'branchId': 'alangilan',
      'category': 'rawMaterial',
      'unit': 'kg',
      'currentStock': 8,
      'reorderThreshold': 5,
    },
    {
      'id': 'inv_pistachio_raw',
      'name': 'Pistachio (raw)',
      'branchId': 'lipa',
      'category': 'rawMaterial',
      'unit': 'kg',
      'currentStock': 4,
      'reorderThreshold': 3,
    },
    {
      'id': 'inv_condensed_milk',
      'name': 'Condensed Milk',
      'branchId': 'batangas_city',
      'category': 'rawMaterial',
      'unit': 'cans',
      'currentStock': 30,
      'reorderThreshold': 12,
    },
    {
      'id': 'inv_vanilla_extract',
      'name': 'Vanilla Extract',
      'branchId': 'lipa',
      'category': 'rawMaterial',
      'unit': 'bottles',
      'currentStock': 3,
      'reorderThreshold': 5,
    },
    {
      'id': 'inv_flour',
      'name': 'Flour',
      'branchId': 'alangilan',
      'category': 'rawMaterial',
      'unit': 'kg',
      'currentStock': 0,
      'reorderThreshold': 10,
    },
  ];

  for (final item in [...productItems, ...rawMaterialItems]) {
    final id = item['id'] as String;
    final data = Map<String, dynamic>.from(item)..remove('id');
    await db.collection('inventory').doc(id).set(data);
  }

  // --- Stock adjustments (Inventory > Adjustments tab) ---
  final now = DateTime.now();
  final adjustments = [
    {
      'id': 'adj_1',
      'itemName': 'Cashews (raw)',
      'branchName': 'Batangas City',
      'type': 'restock',
      'amount': 10,
      'unit': 'kg',
      'staffName': 'Juan D.',
      'timestamp': now.subtract(const Duration(hours: 2)).toIso8601String(),
    },
    {
      'id': 'adj_2',
      'itemName': 'Classic Sans Rival',
      'branchName': 'Alangilan',
      'type': 'deduction',
      'amount': 4,
      'unit': 'pcs',
      'staffName': 'Maria S.',
      'timestamp':
          now.subtract(const Duration(hours: 2, minutes: 17)).toIso8601String(),
    },
    {
      'id': 'adj_3',
      'itemName': 'Butter',
      'branchName': 'Lipa',
      'type': 'restock',
      'amount': 5,
      'unit': 'kg',
      'staffName': 'Admin',
      'timestamp': now.subtract(const Duration(days: 1, hours: 3)).toIso8601String(),
    },
    {
      'id': 'adj_4',
      'itemName': 'Eggs',
      'branchName': 'Batangas City',
      'type': 'deduction',
      'amount': 12,
      'unit': 'pcs',
      'staffName': 'Carlo M.',
      'timestamp':
          now.subtract(const Duration(days: 1, hours: 5, minutes: 20)).toIso8601String(),
    },
    {
      'id': 'adj_5',
      'itemName': 'Mini Sans Rival Box',
      'branchName': 'Alangilan',
      'type': 'restock',
      'amount': 8,
      'unit': 'boxes',
      'staffName': 'Admin',
      'timestamp':
          now.subtract(const Duration(days: 1, hours: 7, minutes: 30)).toIso8601String(),
    },
    {
      'id': 'adj_6',
      'itemName': 'Dark Chocolate',
      'branchName': 'Lipa',
      'type': 'deduction',
      'amount': 2,
      'unit': 'kg',
      'staffName': 'Maria S.',
      'timestamp':
          now.subtract(const Duration(days: 1, hours: 9)).toIso8601String(),
    },
    {
      'id': 'adj_7',
      'itemName': 'Ube Sans Rival',
      'branchName': 'Batangas City',
      'type': 'restock',
      'amount': 15,
      'unit': 'pcs',
      'staffName': 'Juan D.',
      'timestamp':
          now.subtract(const Duration(days: 2, hours: 1)).toIso8601String(),
    },
    {
      'id': 'adj_8',
      'itemName': 'Flour',
      'branchName': 'Alangilan',
      'type': 'deduction',
      'amount': 10,
      'unit': 'kg',
      'staffName': 'Maria S.',
      'timestamp': now.subtract(const Duration(hours: 6)).toIso8601String(),
    },
    {
      'id': 'adj_9',
      'itemName': 'Condensed Milk',
      'branchName': 'Batangas City',
      'type': 'restock',
      'amount': 20,
      'unit': 'cans',
      'staffName': 'Admin',
      'timestamp':
          now.subtract(const Duration(days: 3, hours: 2)).toIso8601String(),
    },
    {
      'id': 'adj_10',
      'itemName': 'Almond Sans Rival',
      'branchName': 'Alangilan',
      'type': 'deduction',
      'amount': 3,
      'unit': 'pcs',
      'staffName': 'Maria S.',
      'timestamp':
          now.subtract(const Duration(days: 1, hours: 1)).toIso8601String(),
    },
  ];
  for (final a in adjustments) {
    final id = a['id'] as String;
    final data = Map<String, dynamic>.from(a)..remove('id');
    await db.collection('stock_adjustments').doc(id).set(data);
  }

  // --- Resource recommendations (Resources > AI Restocking Recommendations) ---
  final recommendations = [
    {
      'id': 'rec_butter',
      'resourceName': 'Butter',
      'urgency': 'urgent',
      'actionTitle': 'Restock immediately',
      'detail':
          'Only 2 kg left — projected to run out in 1 day based on current production rate.',
      'quantityLabel': 'Order 10 kg',
      'actionButtonLabel': 'Order Now',
    },
    {
      'id': 'rec_packaging_machine',
      'resourceName': 'Packaging Machine',
      'urgency': 'urgent',
      'actionTitle': 'Schedule maintenance',
      'detail':
          'Unit #2 has been offline 3 days. Throughput down 48%. Recommend service call today.',
      'quantityLabel': '1 unit offline',
      'actionButtonLabel': 'Restock Now',
    },
    {
      'id': 'rec_cashew_supply',
      'resourceName': 'Cashew Supply',
      'urgency': 'soon',
      'actionTitle': 'Restock within 3 days',
      'detail':
          'Current stock covers 4 more days. Supplier lead time is 2 days — order soon.',
      'quantityLabel': 'Order 25 kg',
      'actionButtonLabel': 'Order Now',
    },
    {
      'id': 'rec_delivery_fleet',
      'resourceName': 'Delivery Fleet',
      'urgency': 'soon',
      'actionTitle': 'Add temporary vehicle',
      'detail':
          'Peak weekend orders expected. Fleet at 67% — consider 1 additional rental Fri-Sun.',
      'quantityLabel': '2 vehicles available',
      'actionButtonLabel': 'Order Now',
    },
    {
      'id': 'rec_flour',
      'resourceName': 'Flour',
      'urgency': 'urgent',
      'actionTitle': 'Restock immediately',
      'detail':
          'Out of stock — production of Ube and other flour-based items halted.',
      'quantityLabel': 'Order 20 kg',
      'actionButtonLabel': 'Order Now',
    },
    {
      'id': 'rec_staff_coverage',
      'resourceName': 'Weekend Staff Coverage',
      'urgency': 'soon',
      'actionTitle': 'Schedule additional shift',
      'detail':
          'Projected 30% higher foot traffic this weekend based on historical trends.',
      'quantityLabel': '2 staff needed',
      'actionButtonLabel': 'Schedule Now',
    },
  ];
  for (final r in recommendations) {
    final id = r['id'] as String;
    final data = Map<String, dynamic>.from(r)..remove('id');
    await db.collection('resource_recommendations').doc(id).set(data);
  }

  // --- Report summaries (Reports screen, Monthly/Weekly toggle) ---
  await db.collection('report_summaries').doc('monthly').set({
    'period': 'monthly',
    'totalRevenue': 125150.0,
    'revenueChangePercent': 12.5,
    'totalOrders': 726,
    'orderChangePercent': 8.3,
    'branchBreakdown': [
      {'branchName': 'Batangas City', 'amount': 45680.0, 'percent': 39.0},
      {'branchName': 'Lipa', 'amount': 32450.0, 'percent': 28.0},
      {'branchName': 'Alangilan', 'amount': 38920.0, 'percent': 33.0},
    ],
  });
  // Weekly figures aren't shown in the mockup screenshots — these are
  // reasonable demo estimates (~23% of the monthly figures) so the toggle
  // has something to display.
  await db.collection('report_summaries').doc('weekly').set({
    'period': 'weekly',
    'totalRevenue': 28800.0,
    'revenueChangePercent': 5.1,
    'totalOrders': 167,
    'orderChangePercent': 3.4,
    'branchBreakdown': [
      {'branchName': 'Batangas City', 'amount': 10500.0, 'percent': 39.0},
      {'branchName': 'Lipa', 'amount': 7450.0, 'percent': 28.0},
      {'branchName': 'Alangilan', 'amount': 8950.0, 'percent': 33.0},
    ],
  });

  // --- Sales summaries (Staff > Sales Snapshot — no mockup, demo values) ---
  await db.collection('sales_summaries').doc('sales_alangilan_today').set({
    'branchId': 'alangilan',
    'date': now.toIso8601String(),
    'revenue': 8450.0,
    'transactionCount': 42,
    'topProducts': [
      {'name': 'Classic Sans Rival', 'amount': 8200.0},
      {'name': 'Mini Sans Rival Box', 'amount': 1140.0},
      {'name': 'Almond Sans Rival', 'amount': 550.0},
    ],
    'revenueChangePercent': 9.4,
    'hourlyBreakdown': [
      {'hour': 8, 'revenue': 420.0},
      {'hour': 10, 'revenue': 980.0},
      {'hour': 12, 'revenue': 1850.0},
      {'hour': 14, 'revenue': 1420.0},
      {'hour': 16, 'revenue': 2100.0},
      {'hour': 18, 'revenue': 1680.0},
    ],
  });
  await db.collection('sales_summaries').doc('sales_batangas_city_today').set({
    'branchId': 'batangas_city',
    'date': now.toIso8601String(),
    'revenue': 6200.0,
    'transactionCount': 31,
    'topProducts': [
      {'name': 'Ube Sans Rival', 'amount': 3100.0},
      {'name': 'Classic Sans Rival', 'amount': 1700.0},
      {'name': 'Mixed Nuts', 'amount': 900.0},
    ],
    'revenueChangePercent': -3.1,
    'hourlyBreakdown': [
      {'hour': 8, 'revenue': 310.0},
      {'hour': 10, 'revenue': 720.0},
      {'hour': 12, 'revenue': 1340.0},
      {'hour': 14, 'revenue': 980.0},
      {'hour': 16, 'revenue': 1550.0},
      {'hour': 18, 'revenue': 1300.0},
    ],
  });
  await db.collection('sales_summaries').doc('sales_lipa_today').set({
    'branchId': 'lipa',
    'date': now.toIso8601String(),
    'revenue': 4100.0,
    'transactionCount': 22,
    'topProducts': [
      {'name': 'Dark Chocolate Sans Rival', 'amount': 1800.0},
      {'name': 'Pistachio Sans Rival', 'amount': 1450.0},
      {'name': 'Vanilla Extract Special', 'amount': 850.0},
    ],
    'revenueChangePercent': 5.7,
    'hourlyBreakdown': [
      {'hour': 8, 'revenue': 210.0},
      {'hour': 10, 'revenue': 480.0},
      {'hour': 12, 'revenue': 890.0},
      {'hour': 14, 'revenue': 720.0},
      {'hour': 16, 'revenue': 1050.0},
      {'hour': 18, 'revenue': 750.0},
    ],
  });
}