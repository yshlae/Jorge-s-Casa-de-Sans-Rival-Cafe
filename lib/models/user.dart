enum UserRole { owner, staff }

class AppUser {
  final String id;
  final String name;
  final UserRole role;
  final String? branchId; // null for Owner, who sees every branch

  const AppUser({
    required this.id,
    required this.name,
    required this.role,
    this.branchId,
  });

  factory AppUser.fromMap(String id, Map<String, dynamic> map) {
    return AppUser(
      id: id,
      name: map['name'] as String? ?? '',
      role: (map['role'] as String? ?? 'staff') == 'owner'
          ? UserRole.owner
          : UserRole.staff,
      branchId: map['branchId'] as String?,
    );
  }

  Map<String, dynamic> toMap() => {
        'name': name,
        'role': role == UserRole.owner ? 'owner' : 'staff',
        'branchId': branchId,
      };
}