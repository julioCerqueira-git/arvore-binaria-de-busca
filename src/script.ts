// Nó da árvore binária
class TreeNode {
    data: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(data: number) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Árvore binária de busca
class BinarySearchTree {
    private root: TreeNode | null;
    private size: number;

    constructor() {
        this.root = null;
        this.size = 0;
    }

    // Insere um elemento na árvore
    insert(data: number): void {
        this.root = this.insertRec(this.root, data);
        this.size++;
    }

    // Inserção recursiva
    private insertRec(node: TreeNode | null, data: number): TreeNode {
        if (node === null) {
            return new TreeNode(data);
        }

        if (data < node.data) {
            node.left = this.insertRec(node.left, data);
        } 
        else if (data > node.data) {
            node.right = this.insertRec(node.right, data);
        }

        return node;
    }

    // Busca um elemento na árvore
    search(data: number): boolean {
        return this.searchRec(this.root, data);
    }

    // Busca recursiva
    private searchRec(node: TreeNode | null, data: number): boolean {
        if (node === null || node.data === data) {
            return node !== null;
        }

        if (data < node.data) {
            return this.searchRec(node.left, data);
        }

        return this.searchRec(node.right, data);
    }

    // Percorre em largura (nível por nível)
    breadthFirstTraversal(): number[] {
        const result: number[] = [];
        if (!this.root) return result;

        const queue: TreeNode[] = [this.root];

        while (queue.length > 0) {
            const current = queue.shift()!;
            result.push(current.data);

            if (current.left) {
                queue.push(current.left);
            }
            if (current.right) {
                queue.push(current.right);
            }
        }

        return result;
    }

    // Percorre em pré-ordem (Raiz-Esquerda-Direita)
    preOrderTraversal(): number[] {
        const result: number[] = [];
        this.preOrderRec(this.root, result);
        return result;
    }

    private preOrderRec(node: TreeNode | null, result: number[]): void {
        if (node !== null) {
            result.push(node.data);
            this.preOrderRec(node.left, result);
            this.preOrderRec(node.right, result);
        }
    }

    // Percorre em-ordem (Esquerda-Raiz-Direita) - retorna em ordem crescente
    inOrderTraversal(): number[] {
        const result: number[] = [];
        this.inOrderRec(this.root, result);
        return result;
    }

    private inOrderRec(node: TreeNode | null, result: number[]): void {
        if (node !== null) {
            this.inOrderRec(node.left, result);
            result.push(node.data);
            this.inOrderRec(node.right, result);
        }
    }

    // Percorre em pós-ordem (Esquerda-Direita-Raiz)
    postOrderTraversal(): number[] {
        const result: number[] = [];
        this.postOrderRec(this.root, result);
        return result;
    }

    private postOrderRec(node: TreeNode | null, result: number[]): void {
        if (node !== null) {
            this.postOrderRec(node.left, result);
            this.postOrderRec(node.right, result);
            result.push(node.data);
        }
    }

    // Calcula a altura da árvore
    getHeight(): number {
        return this.getHeightRec(this.root);
    }

    private getHeightRec(node: TreeNode | null): number {
        if (node === null) {
            return -1;
        }

        const leftHeight = this.getHeightRec(node.left);
        const rightHeight = this.getHeightRec(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Retorna o número de elementos
    getSize(): number {
        return this.size;
    }

    // Encontra ancestrais de um nó
    getAncestors(data: number): number[] {
        const ancestors: number[] = [];
        this.findAncestors(this.root, data, ancestors);
        return ancestors;
    }

    private findAncestors(node: TreeNode | null, data: number, ancestors: number[]): boolean {
        if (node === null) {
            return false;
        }

        if (node.data === data) {
            return true;
        }

        if (this.findAncestors(node.left, data, ancestors) || 
            this.findAncestors(node.right, data, ancestors)) {
            ancestors.push(node.data);
            return true;
        }

        return false;
    }

    // Encontra descendentes de um nó
    getDescendants(data: number): number[] {
        const descendants: number[] = [];
        const targetNode = this.findNode(this.root, data);
        
        if (targetNode) {
            this.collectDescendants(targetNode, descendants);
        }
        
        return descendants;
    }

    private findNode(node: TreeNode | null, data: number): TreeNode | null {
        if (node === null || node.data === data) {
            return node;
        }

        if (data < node.data) {
            return this.findNode(node.left, data);
        }

        return this.findNode(node.right, data);
    }

    private collectDescendants(node: TreeNode, descendants: number[]): void {
        if (node.left) {
            descendants.push(node.left.data);
            this.collectDescendants(node.left, descendants);
        }
        
        if (node.right) {
            descendants.push(node.right.data);
            this.collectDescendants(node.right, descendants);
        }
    }

    // Calcula o nível de um nó (0 = raiz)
    getLevel(data: number): number {
        return this.getLevelRec(this.root, data, 0);
    }

    private getLevelRec(node: TreeNode | null, data: number, level: number): number {
        if (node === null) {
            return -1;
        }

        if (node.data === data) {
            return level;
        }

        const leftLevel = this.getLevelRec(node.left, data, level + 1);
        if (leftLevel !== -1) {
            return leftLevel;
        }

        return this.getLevelRec(node.right, data, level + 1);
    }

    // Verifica se é estritamente binária (cada nó tem 0 ou 2 filhos)
    isStrictlyBinary(): boolean {
        return this.isStrictlyBinaryRec(this.root);
    }

    private isStrictlyBinaryRec(node: TreeNode | null): boolean {
        if (node === null) {
            return true;
        }

        if (node.left === null && node.right === null) {
            return true;
        }

        if (node.left === null || node.right === null) {
            return false;
        }

        return this.isStrictlyBinaryRec(node.left) && this.isStrictlyBinaryRec(node.right);
    }

    // Verifica se é cheia (todos os nós internos têm 2 filhos)
    isFull(): boolean {
        return this.isFullRec(this.root);
    }

    private isFullRec(node: TreeNode | null): boolean {
        if (node === null) {
            return true;
        }

        if (node.left === null && node.right === null) {
            return true;
        }

        if (node.left === null || node.right === null) {
            return false;
        }

        return this.isFullRec(node.left) && this.isFullRec(node.right);
    }

    // Limpa a árvore
    clear(): void {
        this.root = null;
        this.size = 0;
    }
}

// Interface da aplicação
class TreeVisualizer {
    private tree: BinarySearchTree;
    private outputElement: HTMLElement;

    constructor() {
        this.tree = new BinarySearchTree();
        const output = document.getElementById('output');
        if (!output) throw new Error('Elemento output não encontrado');
        this.outputElement = output;
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Inserir elemento
        const insertForm = document.getElementById('insertForm');
        if (insertForm) {
            insertForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('insertInput') as HTMLInputElement;
                if (input) {
                    const value = parseInt(input.value);
                    if (!isNaN(value)) {
                        this.tree.insert(value);
                        input.value = '';
                        this.updateOutput();
                        this.showMessage(`Elemento ${value} inserido com sucesso!`, 'success', 'insertForm');
                    } else {
                        this.showMessage('Por favor, insira um número válido.', 'error', 'insertForm');
                    }
                }
            });
        }

        // Buscar elemento
        const searchForm = document.getElementById('searchForm');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('searchInput') as HTMLInputElement;
                if (input) {
                    const value = parseInt(input.value);
                    if (!isNaN(value)) {
                        const found = this.tree.search(value);
                        input.value = '';
                        if (found) {
                            this.showMessage(`Elemento ${value} encontrado na árvore!`, 'success', 'searchForm');
                        } else {
                            this.showMessage(`Elemento ${value} não encontrado na árvore.`, 'error', 'searchForm');
                        }
                    } else {
                        this.showMessage('Por favor, insira um número válido.', 'error', 'searchForm');
                    }
                }
            });
        }

        // Buscar ancestrais
        const ancestorsBtn = document.getElementById('ancestorsBtn');
        if (ancestorsBtn) {
            ancestorsBtn.addEventListener('click', () => {
                const input = document.getElementById('ancestorsInput') as HTMLInputElement;
                if (input) {
                    const value = parseInt(input.value);
                    if (!isNaN(value)) {
                        const ancestors = this.tree.getAncestors(value);
                        input.value = '';
                        if (ancestors.length > 0) {
                            this.showMessage(`Ancestrais de ${value}: ${ancestors.join(', ')}`, 'info', 'ancestorsInput');
                        } else {
                            this.showMessage(`Elemento ${value} não encontrado ou não possui ancestrais.`, 'error', 'ancestorsInput');
                        }
                    } else {
                        this.showMessage('Por favor, insira um número válido.', 'error', 'ancestorsInput');
                    }
                }
            });
        }

        // Buscar descendentes
        const descendantsBtn = document.getElementById('descendantsBtn');
        if (descendantsBtn) {
            descendantsBtn.addEventListener('click', () => {
                const input = document.getElementById('descendantsInput') as HTMLInputElement;
                if (input) {
                    const value = parseInt(input.value);
                    if (!isNaN(value)) {
                        const descendants = this.tree.getDescendants(value);
                        input.value = '';
                        if (descendants.length > 0) {
                            this.showMessage(`Descendentes de ${value}: ${descendants.join(', ')}`, 'info', 'descendantsInput');
                        } else {
                            this.showMessage(`Elemento ${value} não encontrado ou não possui descendentes.`, 'error', 'descendantsInput');
                        }
                    } else {
                        this.showMessage('Por favor, insira um número válido.', 'error', 'descendantsInput');
                    }
                }
            });
        }

        // Buscar nível
        const levelBtn = document.getElementById('levelBtn');
        if (levelBtn) {
            levelBtn.addEventListener('click', () => {
                const input = document.getElementById('levelInput') as HTMLInputElement;
                if (input) {
                    const value = parseInt(input.value);
                    if (!isNaN(value)) {
                        const level = this.tree.getLevel(value);
                        input.value = '';
                        if (level !== -1) {
                            this.showMessage(`Nível do elemento ${value}: ${level}`, 'info', 'levelInput');
                        } else {
                            this.showMessage(`Elemento ${value} não encontrado na árvore.`, 'error', 'levelInput');
                        }
                    } else {
                        this.showMessage('Por favor, insira um número válido.', 'error', 'levelInput');
                    }
                }
            });
        }

        // Controles
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.tree.clear();
                this.updateOutput();
            });
        }

        const exampleBtn = document.getElementById('exampleBtn');
        if (exampleBtn) {
            exampleBtn.addEventListener('click', () => {
                const exampleValues = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45, 55, 65, 75, 85];
                exampleValues.forEach(value => this.tree.insert(value));
                this.updateOutput();
            });
        }
    }

    private showMessage(message: string, type: 'success' | 'error' | 'info', elementId: string): void {
        // Remover mensagem anterior se existir
        const existingMessage = document.querySelector(`[data-message-for="${elementId}"]`);
        if (existingMessage) {
            existingMessage.remove();
        }

        // Criar nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.setAttribute('data-message-for', elementId);
        messageDiv.textContent = message;

        // Encontrar a seção pai para inserir a mensagem
        let targetSection: HTMLElement | null = null;
        
        if (elementId === 'insertForm') {
            // Encontrar a seção que contém o formulário de inserção
            const insertForm = document.getElementById('insertForm');
            if (insertForm) {
                targetSection = insertForm.closest('.section');
            }
        } else if (elementId === 'searchForm') {
            // Encontrar a seção que contém o formulário de busca
            const searchForm = document.getElementById('searchForm');
            if (searchForm) {
                targetSection = searchForm.closest('.section');
            }
        } else if (elementId === 'ancestorsInput' || elementId === 'descendantsInput' || elementId === 'levelInput') {
            // Encontrar a seção que contém os inputs de análise
            const ancestorsInput = document.getElementById('ancestorsInput');
            if (ancestorsInput) {
                targetSection = ancestorsInput.closest('.section');
            }
        }

        if (targetSection) {
            // Inserir a mensagem no final da seção
            targetSection.appendChild(messageDiv);
        }

        // Remover a mensagem após 8 segundos (mais tempo)
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 8000);
    }

    private updateOutput(): void {
        if (this.tree.getSize() === 0) {
            this.outputElement.innerHTML = '<p class="empty">Árvore vazia</p>';
            return;
        }

        const preOrder = this.tree.preOrderTraversal();
        const inOrder = this.tree.inOrderTraversal();
        const postOrder = this.tree.postOrderTraversal();
        const breadthFirst = this.tree.breadthFirstTraversal();
        const height = this.tree.getHeight();
        const size = this.tree.getSize();
        const isStrictlyBinary = this.tree.isStrictlyBinary();
        const isFull = this.tree.isFull();

        this.outputElement.innerHTML = `
            <div class="tree-info">
                <h3>Informações da Árvore</h3>
                <p><strong>Quantidade:</strong> ${size}</p>
                <p><strong>Altura:</strong> ${height}</p>
                <p><strong>Estritamente binária:</strong> ${isStrictlyBinary ? 'Sim' : 'Não'}</p>
                <p><strong>Cheia:</strong> ${isFull ? 'Sim' : 'Não'}</p>
            </div>
            
            <div class="traversals">
                <h3>Navegações</h3>
                <p><strong>Pré-ordem:</strong> ${preOrder.join(' → ')}</p>
                <p><strong>Em-ordem:</strong> ${inOrder.join(' → ')}</p>
                <p><strong>Pós-ordem:</strong> ${postOrder.join(' → ')}</p>
                <p><strong>Busca em largura:</strong> ${breadthFirst.join(' → ')}</p>
            </div>
        `;
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new TreeVisualizer();
});