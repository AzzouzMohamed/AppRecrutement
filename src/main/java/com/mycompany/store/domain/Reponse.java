package com.mycompany.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Reponse.
 */
@Entity
@Table(name = "reponse")
public class Reponse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "enoncedela_reponse", nullable = false)
    private String enoncedelaReponse;

    @NotNull
    @Column(name = "verite", nullable = false)
    private Boolean verite;

    @ManyToOne
    @JsonIgnoreProperties(value = "reponses", allowSetters = true)
    private Question question;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnoncedelaReponse() {
        return enoncedelaReponse;
    }

    public Reponse enoncedelaReponse(String enoncedelaReponse) {
        this.enoncedelaReponse = enoncedelaReponse;
        return this;
    }

    public void setEnoncedelaReponse(String enoncedelaReponse) {
        this.enoncedelaReponse = enoncedelaReponse;
    }

    public Boolean isVerite() {
        return verite;
    }

    public Reponse verite(Boolean verite) {
        this.verite = verite;
        return this;
    }

    public void setVerite(Boolean verite) {
        this.verite = verite;
    }

    public Question getQuestion() {
        return question;
    }

    public Reponse question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reponse)) {
            return false;
        }
        return id != null && id.equals(((Reponse) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reponse{" +
            "id=" + getId() +
            ", enoncedelaReponse='" + getEnoncedelaReponse() + "'" +
            ", verite='" + isVerite() + "'" +
            "}";
    }
}
