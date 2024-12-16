DO $$ DECLARE
    table_name RECORD;
BEGIN
    FOR table_name IN
        SELECT tablename
        FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || table_name.tablename || ' CASCADE';
    END LOOP;
END $$;
