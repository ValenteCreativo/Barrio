#!/bin/bash
set -e
export PATH=/opt/mssql-tools/bin:$PATH

echo "Esperando a que el motor SQL acepte conexiones..."
for i in $(seq 1 30); do
  if sqlcmd -S sqlserver -U sa -P "$MSSQL_SA_PASSWORD" -C -Q "SELECT 1" >/dev/null 2>&1; then
    break
  fi
  sleep 5
done

sqlcmd -S sqlserver -U sa -P "$MSSQL_SA_PASSWORD" -C -Q "IF DB_ID(N'BarrioDB') IS NULL CREATE DATABASE BarrioDB"

for s in ident lkp biz catalogo ord pay soc aud app; do
  sqlcmd -S sqlserver -U sa -P "$MSSQL_SA_PASSWORD" -C -d BarrioDB -Q "IF SCHEMA_ID(N'$s') IS NULL EXEC('CREATE SCHEMA $s AUTHORIZATION dbo')"
done

for f in 01_lkp_catalogos.sql 02_ident_identidad.sql 03_biz_comercios.sql 04_catalogo_productos.sql 05_ord_pedidos.sql 06_pay_pagos.sql 07_soc_comunidad.sql 08_aud_auditoria.sql 09_app_views.sql 10_app_procedures.sql 11_security.sql 12_seed_data.sql; do
  echo "Ejecutando $f..."
  sqlcmd -S sqlserver -U sa -P "$MSSQL_SA_PASSWORD" -C -d BarrioDB -i /scripts/$f
done

echo "Despliegue de BarrioDB completado."
