import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmbeddingsService {
    private endpoint = 'http://localhost:5000/embed';

    async getEmbedding(text: string): Promise<number[]> {
        const response = await axios.post(this.endpoint, {
            texts: [text]
        })
        return response.data.embeddings[0];
    }

    async getEmbeddings(texts: string[]): Promise<number[][]> {
        const response = await axios.post(this.endpoint, { texts });
        return response.data.embeddings;
    }
}
