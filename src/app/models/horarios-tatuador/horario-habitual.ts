export interface HorarioHabitual {
  id?: number;
  id_tatuador: number;
  dia_semana: number; 
  hora_inicio: string;
  hora_fin: string;
  duracion_turno_min: number;
}

export interface HorarioHabitualInput {
  dia_semana: number;
  hora_inicio: string;
  hora_fin: string;
  duracion_turno_min: number;
}