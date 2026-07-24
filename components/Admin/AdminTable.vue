<template>
  <div class="admin-table-card">
    <div class="admin-table-scroll">
      <table class="admin-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
            <th v-if="$slots.actions" class="admin-table-actions-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="items.length === 0">
            <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="admin-table-empty">
              {{ emptyText }}
            </td>
          </tr>
          <tr v-for="item in items" :key="item[rowKey]">
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :item="item" :value="item[col.key]">
                {{ item[col.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="admin-table-actions-col">
              <slot name="actions" :item="item" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns: { type: Array, required: true },
  items: { type: Array, required: true },
  rowKey: { type: String, default: 'id' },
  emptyText: { type: String, default: 'No hay registros todavía.' }
})
</script>

<style scoped>
.admin-table-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.admin-table-scroll {
  overflow-x: auto;
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
}
.admin-table thead th {
  text-align: left;
  padding: 14px 20px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8a8a8a;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
}
.admin-table tbody td {
  padding: 14px 20px;
  font-size: 0.92rem;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
  vertical-align: middle;
}
.admin-table tbody tr:last-child td {
  border-bottom: none;
}
.admin-table tbody tr {
  transition: background-color 0.15s ease;
}
.admin-table tbody tr:hover td {
  background: #f7faf5;
}
.admin-table-actions-col {
  white-space: nowrap;
  text-align: right;
}
.admin-table-actions-col :deep(.btn) {
  margin-left: 8px;
}
.admin-table-empty {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 50px 10px;
}
</style>
