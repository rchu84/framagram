namespace :db do
  desc 'Force a db:reset of database'
  task hard_reset: :environment do
    if Rails.env.development?
      conn = ActiveRecord::Base.connection
      # Terminate all connections except our current one
      conn.execute("SELECT
                      pg_terminate_backend (pid)
                    FROM
                      pg_stat_activity
                    WHERE
                      pid <> pg_backend_pid ()
                    AND datname = 'converger_development';")
      # Close the connection behind us
      ActiveRecord::Base.connection.close
# Invoke a task now all connections are gone
      Rake::Task['db:reset'].invoke
      Rake::Task['db:migrate'].invoke
p "Forced a db:reset for environment #{Rails.env}"
    else
      p "Sorry I cannot db:reset db on this environment: #{Rails.env}"
    end
  end
end