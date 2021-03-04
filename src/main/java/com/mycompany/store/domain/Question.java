package com.mycompany.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.store.domain.enumeration.Difficulte;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "enonce", nullable = false)
    private String enonce;

    @NotNull
    @Column(name = "timing", nullable = false)
    private Long timing;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "niveaudedifficulte", nullable = false)
    private Difficulte niveaudedifficulte;

    @OneToMany(mappedBy = "question")
    private Set<Reponse> reponses = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "questions", allowSetters = true)
    private Examin examin;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnonce() {
        return enonce;
    }

    public Question enonce(String enonce) {
        this.enonce = enonce;
        return this;
    }

    public void setEnonce(String enonce) {
        this.enonce = enonce;
    }

    public Long getTiming() {
        return timing;
    }

    public Question timing(Long timing) {
        this.timing = timing;
        return this;
    }

    public void setTiming(Long timing) {
        this.timing = timing;
    }

    public Difficulte getNiveaudedifficulte() {
        return niveaudedifficulte;
    }

    public Question niveaudedifficulte(Difficulte niveaudedifficulte) {
        this.niveaudedifficulte = niveaudedifficulte;
        return this;
    }

    public void setNiveaudedifficulte(Difficulte niveaudedifficulte) {
        this.niveaudedifficulte = niveaudedifficulte;
    }

    public Set<Reponse> getReponses() {
        return reponses;
    }

    public Question reponses(Set<Reponse> reponses) {
        this.reponses = reponses;
        return this;
    }

    public Question addReponse(Reponse reponse) {
        this.reponses.add(reponse);
        reponse.setQuestion(this);
        return this;
    }

    public Question removeReponse(Reponse reponse) {
        this.reponses.remove(reponse);
        reponse.setQuestion(null);
        return this;
    }

    public void setReponses(Set<Reponse> reponses) {
        this.reponses = reponses;
    }

    public Examin getExamin() {
        return examin;
    }

    public Question examin(Examin examin) {
        this.examin = examin;
        return this;
    }

    public void setExamin(Examin examin) {
        this.examin = examin;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", enonce='" + getEnonce() + "'" +
            ", timing=" + getTiming() +
            ", niveaudedifficulte='" + getNiveaudedifficulte() + "'" +
            "}";
    }
}
