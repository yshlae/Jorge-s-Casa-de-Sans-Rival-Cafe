// Backs the Owner > Inventory tab: stat chips (In Stock / Low Stock /
// Critical), the All Categories / Products / Raw Materials / Adjustments
// sub-tabs, and the underlying item + adjustment-log lists.

import 'dart:async';
import 'package:flutter/foundation.dart';
import '../models/inventory_item.dart';
import '../models/branch.dart';
import '../models/stock_adjustment_log.dart';
import '../services/branch_service.dart';
import '../services/inventory_service.dart';
import '../services/stock_adjustment_service.dart';

enum InventoryTab { all, products, rawMaterials, adjustments }

class InventoryState extends ChangeNotifier {
  final InventoryService _inventoryService = InventoryService();
  final StockAdjustmentService _adjustmentService = StockAdjustmentService();
  final BranchService _branchService = BranchService();

  StreamSubscription<List<InventoryItem>>? _itemsSub;
  StreamSubscription<List<StockAdjustmentLog>>? _logsSub;
  StreamSubscription<List<Branch>>? _branchesSub;

  List<InventoryItem> _allItems = [];
  List<StockAdjustmentLog> _logs = [];
  List<Branch> _branches = [];
  InventoryTab _selectedTab = InventoryTab.all;
  bool _isSaving = false;
  String? _errorMessage;

  /// Resolves a branchId (e.g. "batangas_city") to its display name (e.g.
  /// "Batangas City") for adjustment logs. Falls back to the raw id if the
  /// branch list hasn't loaded yet.
  String _branchNameFor(String branchId) {
    final match = _branches.where((b) => b.id == branchId);
    return match.isNotEmpty ? match.first.name : branchId;
  }

  InventoryTab get selectedTab => _selectedTab;
  List<StockAdjustmentLog> get adjustmentLogs => _logs;
  bool get isLoading => _allItems.isEmpty;
  bool get isSaving => _isSaving;
  String? get errorMessage => _errorMessage;

  int get inStockCount =>
      _allItems.where((i) => i.status == StockStatus.ok).length;
  int get lowStockCount =>
      _allItems.where((i) => i.status == StockStatus.low).length;
  int get criticalCount =>
      _allItems.where((i) => i.status == StockStatus.critical).length;

  /// Unfiltered list of every item, across all branches and categories —
  /// used by the "+ New" adjustment sheet's item picker, since the Owner
  /// can log an adjustment for any item regardless of the active tab.
  List<InventoryItem> get allItems => _allItems;

  /// Items shown in the currently selected category tab. Not used for the
  /// Adjustments tab — that reads from `adjustmentLogs` instead.
  List<InventoryItem> get visibleItems {
    switch (_selectedTab) {
      case InventoryTab.products:
        return _allItems
            .where((i) => i.category == InventoryCategory.product)
            .toList();
      case InventoryTab.rawMaterials:
        return _allItems
            .where((i) => i.category == InventoryCategory.rawMaterial)
            .toList();
      case InventoryTab.all:
      case InventoryTab.adjustments:
        return _allItems;
    }
  }

  InventoryState() {
    _itemsSub = _inventoryService.watchAllItems().listen((data) {
      _allItems = data;
      notifyListeners();
    });
    _logsSub = _adjustmentService.watchAllLogs().listen((data) {
      _logs = data;
      notifyListeners();
    });
    _branchesSub = _branchService.watchBranches().listen((data) {
      _branches = data;
      notifyListeners();
    });
  }

  void selectTab(InventoryTab tab) {
    _selectedTab = tab;
    notifyListeners();
  }

  /// Used by the Inventory > Adjustments tab's "+ New" button. Mirrors
  /// StaffState.submitAdjustment — updates the live stock count AND writes
  /// a log entry in one call, so the Owner can log an adjustment directly
  /// (e.g. correcting a count) without needing to be the Staff member
  /// on-site.
  Future<bool> submitAdjustment({
    required InventoryItem item,
    required AdjustmentType type,
    required int amount,
    required String staffName,
  }) async {
    if (amount <= 0) {
      _errorMessage = 'Enter an amount greater than zero.';
      notifyListeners();
      return false;
    }

    _isSaving = true;
    _errorMessage = null;
    notifyListeners();

    try {
      int newStock;
      if (type == AdjustmentType.restock) {
        newStock = item.currentStock + amount;
      } else {
        newStock = item.currentStock - amount;
        if (newStock < 0) newStock = 0;
      }

      await _inventoryService.updateStock(item.id, newStock);
      await _adjustmentService.addLog(StockAdjustmentLog(
        id: '',
        itemName: item.name,
        branchName: _branchNameFor(item.branchId),
        type: type,
        amount: amount,
        unit: item.unit,
        staffName: staffName,
        timestamp: DateTime.now(),
      ));

      _isSaving = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isSaving = false;
      _errorMessage = 'Failed to save adjustment. Please try again.';
      notifyListeners();
      return false;
    }
  }

  /// Used by the Inventory tab to discontinue a product. Firestore's
  /// watchAllItems() stream will drop the item from _allItems on its own
  /// once the delete lands — no manual list mutation needed here.
  Future<bool> deleteItem(InventoryItem item) async {
    _isSaving = true;
    _errorMessage = null;
    notifyListeners();

    try {
      await _inventoryService.deleteItem(item.id);
      _isSaving = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isSaving = false;
      _errorMessage = 'Failed to delete "${item.name}". Please try again.';
      notifyListeners();
      return false;
    }
  }

  @override
  void dispose() {
    _itemsSub?.cancel();
    _logsSub?.cancel();
    _branchesSub?.cancel();
    super.dispose();
  }
}