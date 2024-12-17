import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import necessário para *ngIf

@Component({
  selector: 'app-modal-projects',
  imports: [CommonModule], // Importa o CommonModule para habilitar *ngIf
  templateUrl: './modal-projects.component.html',
  styleUrl: './modal-projects.component.scss',
  standalone: true, // Certifica-se de que é um componente standalone
})
export class ModalProjectsComponent {
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
