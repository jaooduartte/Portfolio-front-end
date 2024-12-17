import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import necessário para *ngIf

@Component({
  selector: 'app-modal-experiencia',
  templateUrl: './modal-experiencia.component.html',
  styleUrls: ['./modal-experiencia.component.scss'],
  standalone: true, // Certifica-se de que é um componente standalone
  imports: [CommonModule], // Importa o CommonModule para habilitar *ngIf
})
export class ModalExperienciaComponent {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();

  isClosing: boolean = false;

  closeModal() {
    this.isClosing = true; // Ativa a animação de saída
    setTimeout(() => {
      this.isClosing = false; // Reseta o estado
      this.isVisible = false; // Esconde a modal
      this.onClose.emit(); // Emite o evento de fechamento
    }, 500); // Tempo da animação (500ms)
  }
}