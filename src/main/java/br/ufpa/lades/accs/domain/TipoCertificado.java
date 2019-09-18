package br.ufpa.lades.accs.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A TipoCertificado.
 */
@Entity
@Table(name = "tipo_certificado")
public class TipoCertificado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public TipoCertificado nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoCertificado)) {
            return false;
        }
        return id != null && id.equals(((TipoCertificado) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoCertificado{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
