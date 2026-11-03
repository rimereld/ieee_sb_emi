-- Email each new form entry to contact@ieee-emi.com via the form-notify Edge Function.
create extension if not exists pg_net with schema extensions;

alter table public.join_applications add column if not exists notified_at timestamptz;
alter table public.contact_messages add column if not exists notified_at timestamptz;

create or replace function public.notify_form_submission()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform net.http_post(
    url := 'https://hupuobgxaxhtumlbidcy.supabase.co/functions/v1/form-notify',
    body := jsonb_build_object('table', tg_table_name, 'id', new.id),
    headers := '{"Content-Type": "application/json"}'::jsonb,
    timeout_milliseconds := 10000
  );
  return new;
end;
$$;

revoke all on function public.notify_form_submission() from public, anon, authenticated;

drop trigger if exists email_on_join_application on public.join_applications;
create trigger email_on_join_application
  after insert on public.join_applications
  for each row execute function public.notify_form_submission();

drop trigger if exists email_on_contact_message on public.contact_messages;
create trigger email_on_contact_message
  after insert on public.contact_messages
  for each row execute function public.notify_form_submission();
