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

  downloadDocument() {
    try {
      console.log('Download iniciado');
      const fileUrl = '/assets/Documentacao-Completa-IPJ.pdf';
      console.log('Caminho do arquivo:', fileUrl);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'Documentacao-Completa-IPJ.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao tentar baixar a documentação:', error);
    }
  }
}
