SELECT 'CREATE DATABASE otus_documents_db'
WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'otus_documents_db')\gexec
