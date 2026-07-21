class Branch {
  final String id;
  final String name;

  const Branch({required this.id, required this.name});

  factory Branch.fromMap(String id, Map<String, dynamic> map) {
    return Branch(id: id, name: map['name'] as String? ?? '');
  }

  Map<String, dynamic> toMap() => {'name': name};
}