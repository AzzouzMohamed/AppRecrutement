package com.mycompany.store.web.rest;

import com.mycompany.store.Test11App;
import com.mycompany.store.domain.Candidat;
import com.mycompany.store.repository.CandidatRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CandidatResource} REST controller.
 */
@SpringBootTest(classes = Test11App.class)
@AutoConfigureMockMvc
@WithMockUser
public class CandidatResourceIT {

    private static final String DEFAULT_FULL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FULL_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "z@7,z1s.!d=];m";
    private static final String UPDATED_EMAIL = "CM;~c@!}G.?\"=&";

    private static final String DEFAULT_DIPLOME = "AAAAAAAAAA";
    private static final String UPDATED_DIPLOME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    @Autowired
    private CandidatRepository candidatRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCandidatMockMvc;

    private Candidat candidat;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Candidat createEntity(EntityManager em) {
        Candidat candidat = new Candidat()
            .fullName(DEFAULT_FULL_NAME)
            .email(DEFAULT_EMAIL)
            .diplome(DEFAULT_DIPLOME)
            .phone(DEFAULT_PHONE)
            .city(DEFAULT_CITY);
        return candidat;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Candidat createUpdatedEntity(EntityManager em) {
        Candidat candidat = new Candidat()
            .fullName(UPDATED_FULL_NAME)
            .email(UPDATED_EMAIL)
            .diplome(UPDATED_DIPLOME)
            .phone(UPDATED_PHONE)
            .city(UPDATED_CITY);
        return candidat;
    }

    @BeforeEach
    public void initTest() {
        candidat = createEntity(em);
    }

    @Test
    @Transactional
    public void createCandidat() throws Exception {
        int databaseSizeBeforeCreate = candidatRepository.findAll().size();
        // Create the Candidat
        restCandidatMockMvc.perform(post("/api/candidats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidat)))
            .andExpect(status().isCreated());

        // Validate the Candidat in the database
        List<Candidat> candidatList = candidatRepository.findAll();
        assertThat(candidatList).hasSize(databaseSizeBeforeCreate + 1);
        Candidat testCandidat = candidatList.get(candidatList.size() - 1);
        assertThat(testCandidat.getFullName()).isEqualTo(DEFAULT_FULL_NAME);
        assertThat(testCandidat.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCandidat.getDiplome()).isEqualTo(DEFAULT_DIPLOME);
        assertThat(testCandidat.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testCandidat.getCity()).isEqualTo(DEFAULT_CITY);
    }

    @Test
    @Transactional
    public void createCandidatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = candidatRepository.findAll().size();

        // Create the Candidat with an existing ID
        candidat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCandidatMockMvc.perform(post("/api/candidats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidat)))
            .andExpect(status().isBadRequest());

        // Validate the Candidat in the database
        List<Candidat> candidatList = candidatRepository.findAll();
        assertThat(candidatList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFullNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = candidatRepository.findAll().size();
        // set the field null
        candidat.setFullName(null);

        // Create the Candidat, which fails.


        restCandidatMockMvc.perform(post("/api/candidats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidat)))
            .andExpect(status().isBadRequest());

        List<Candidat> candidatList = candidatRepository.findAll();
        assertThat(candidatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = candidatRepository.findAll().size();
        // set the field null
        candidat.setEmail(null);

        // Create the Candidat, which fails.


        restCandidatMockMvc.perform(post("/api/candidats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidat)))
            .andExpect(status().isBadRequest());

        List<Candidat> candidatList = candidatRepository.findAll();
        assertThat(candidatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDiplomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = candidatRepository.findAll().size();
        // set the field null
        candidat.setDiplome(null);

        // Create the Candidat, which fails.


        restCandidatMockMvc.perform(post("/api/candidats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidat)))
            .andExpect(status().isBadRequest());

        List<Candidat> candidatList = candidatRepository.findAll();
        assertThat(candidatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = candidatRepository.findAll().size();
        // set the field null
        candidat.setPhone(null);

        // Create the Candidat, which fails.


        restCandidatMockMvc.perform(post("/api/candidats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidat)))
            .andExpect(status().isBadRequest());

        List<Candidat> candidatList = candidatRepository.findAll();
        assertThat(candidatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = candidatRepository.findAll().size();
        // set the field null
        candidat.setCity(null);

        // Create the Candidat, which fails.


        restCandidatMockMvc.perform(post("/api/candidats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidat)))
            .andExpect(status().isBadRequest());

        List<Candidat> candidatList = candidatRepository.findAll();
        assertThat(candidatList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCandidats() throws Exception {
        // Initialize the database
        candidatRepository.saveAndFlush(candidat);

        // Get all the candidatList
        restCandidatMockMvc.perform(get("/api/candidats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(candidat.getId().intValue())))
            .andExpect(jsonPath("$.[*].fullName").value(hasItem(DEFAULT_FULL_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].diplome").value(hasItem(DEFAULT_DIPLOME)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)));
    }
    
    @Test
    @Transactional
    public void getCandidat() throws Exception {
        // Initialize the database
        candidatRepository.saveAndFlush(candidat);

        // Get the candidat
        restCandidatMockMvc.perform(get("/api/candidats/{id}", candidat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(candidat.getId().intValue()))
            .andExpect(jsonPath("$.fullName").value(DEFAULT_FULL_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.diplome").value(DEFAULT_DIPLOME))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY));
    }
    @Test
    @Transactional
    public void getNonExistingCandidat() throws Exception {
        // Get the candidat
        restCandidatMockMvc.perform(get("/api/candidats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCandidat() throws Exception {
        // Initialize the database
        candidatRepository.saveAndFlush(candidat);

        int databaseSizeBeforeUpdate = candidatRepository.findAll().size();

        // Update the candidat
        Candidat updatedCandidat = candidatRepository.findById(candidat.getId()).get();
        // Disconnect from session so that the updates on updatedCandidat are not directly saved in db
        em.detach(updatedCandidat);
        updatedCandidat
            .fullName(UPDATED_FULL_NAME)
            .email(UPDATED_EMAIL)
            .diplome(UPDATED_DIPLOME)
            .phone(UPDATED_PHONE)
            .city(UPDATED_CITY);

        restCandidatMockMvc.perform(put("/api/candidats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCandidat)))
            .andExpect(status().isOk());

        // Validate the Candidat in the database
        List<Candidat> candidatList = candidatRepository.findAll();
        assertThat(candidatList).hasSize(databaseSizeBeforeUpdate);
        Candidat testCandidat = candidatList.get(candidatList.size() - 1);
        assertThat(testCandidat.getFullName()).isEqualTo(UPDATED_FULL_NAME);
        assertThat(testCandidat.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCandidat.getDiplome()).isEqualTo(UPDATED_DIPLOME);
        assertThat(testCandidat.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testCandidat.getCity()).isEqualTo(UPDATED_CITY);
    }

    @Test
    @Transactional
    public void updateNonExistingCandidat() throws Exception {
        int databaseSizeBeforeUpdate = candidatRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCandidatMockMvc.perform(put("/api/candidats")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(candidat)))
            .andExpect(status().isBadRequest());

        // Validate the Candidat in the database
        List<Candidat> candidatList = candidatRepository.findAll();
        assertThat(candidatList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCandidat() throws Exception {
        // Initialize the database
        candidatRepository.saveAndFlush(candidat);

        int databaseSizeBeforeDelete = candidatRepository.findAll().size();

        // Delete the candidat
        restCandidatMockMvc.perform(delete("/api/candidats/{id}", candidat.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Candidat> candidatList = candidatRepository.findAll();
        assertThat(candidatList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
