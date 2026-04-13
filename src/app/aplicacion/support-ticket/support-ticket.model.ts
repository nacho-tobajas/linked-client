export class SupportTicket {
  id: number = 0;
  status: boolean = false;
  creationuser: string = '';
  creationtimestamp: string | null = null;
  modificationuser?: string;
  modificationtimestamp?: string | null = null;
  description: string | null = null;
  category?: string | null = null;
  priority?: string | null = null;
  url_pagina?: string | null = null;
  user_agent?: string | null = null;
  screenshot?: string | null = null;
  admin_response?: string | null = null;
  contact_email?: string | null = null;
}
