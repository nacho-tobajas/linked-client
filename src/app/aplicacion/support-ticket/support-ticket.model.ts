export class SupportTicket {
  id: number = 0;
  status: boolean = false;
  creationuser: string = '';
  creationtimestamp: string | null = null;
  modificationuser?: string;
  modificationtimestamp?: string | null = null;
  description: string | null = null;
}