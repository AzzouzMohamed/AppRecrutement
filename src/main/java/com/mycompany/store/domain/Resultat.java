package com.mycompany.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.mycompany.store.domain.enumeration.Mention;

/**
 * A Resultat.
 */
@Entity
@Table(name = "resultat")
public class Resultat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "note", nullable = false)
    private Long note;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "mention", nullable = false)
    private Mention mention;

    @ManyToOne
    @JsonIgnoreProperties(value = "resultats", allowSetters = true)
    private Examin examin;

    @ManyToOne
    @JsonIgnoreProperties(value = "resultats", allowSetters = true)
    private Candidat candidat;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNote() {
        return note;
    }

    public Resultat note(Long note) {
        this.note = note;
        return this;
    }

    public void setNote(Long note) {
        this.note = note;
    }

    public Mention getMention() {
        return mention;
    }

    public Resultat mention(Mention mention) {
        this.mention = mention;
        return this;
    }

    public void setMention(Mention mention) {
        this.mention = mention;
    }

    public Examin getExamin() {
        return examin;
    }

    public Resultat examin(Examin examin) {
        this.examin = examin;
        return this;
    }

    public void setExamin(Examin examin) {
        this.examin = examin;
    }

    public Candidat getCandidat() {
        return candidat;
    }

    public Resultat candidat(Candidat candidat) {
        this.candidat = candidat;
        return this;
    }

    public void setCandidat(Candidat candidat) {
        this.candidat = candidat;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Resultat)) {
            return false;
        }
        return id != null && id.equals(((Resultat) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Resultat{" +
            "id=" + getId() +
            ", note=" + getNote() +
            ", mention='" + getMention() + "'" +
            "}";
    }
}
