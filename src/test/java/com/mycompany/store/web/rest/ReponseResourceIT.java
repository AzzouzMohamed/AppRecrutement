package com.mycompany.store.web.rest;

import com.mycompany.store.Test11App;
import com.mycompany.store.domain.Reponse;
import com.mycompany.store.repository.ReponseRepository;

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
 * Integration tests for the {@link ReponseResource} REST controller.
 */
@SpringBootTest(classes = Test11App.class)
@AutoConfigureMockMvc
@WithMockUser
public class ReponseResourceIT {

    private static final String DEFAULT_ENONCEDELA_REPONSE = "AAAAAAAAAA";
    private static final String UPDATED_ENONCEDELA_REPONSE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VERITE = false;
    private static final Boolean UPDATED_VERITE = true;

    @Autowired
    private ReponseRepository reponseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReponseMockMvc;

    private Reponse reponse;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reponse createEntity(EntityManager em) {
        Reponse reponse = new Reponse()
            .enoncedelaReponse(DEFAULT_ENONCEDELA_REPONSE)
            .verite(DEFAULT_VERITE);
        return reponse;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reponse createUpdatedEntity(EntityManager em) {
        Reponse reponse = new Reponse()
            .enoncedelaReponse(UPDATED_ENONCEDELA_REPONSE)
            .verite(UPDATED_VERITE);
        return reponse;
    }

    @BeforeEach
    public void initTest() {
        reponse = createEntity(em);
    }

    @Test
    @Transactional
    public void createReponse() throws Exception {
        int databaseSizeBeforeCreate = reponseRepository.findAll().size();
        // Create the Reponse
        restReponseMockMvc.perform(post("/api/reponses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isCreated());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeCreate + 1);
        Reponse testReponse = reponseList.get(reponseList.size() - 1);
        assertThat(testReponse.getEnoncedelaReponse()).isEqualTo(DEFAULT_ENONCEDELA_REPONSE);
        assertThat(testReponse.isVerite()).isEqualTo(DEFAULT_VERITE);
    }

    @Test
    @Transactional
    public void createReponseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reponseRepository.findAll().size();

        // Create the Reponse with an existing ID
        reponse.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReponseMockMvc.perform(post("/api/reponses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isBadRequest());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkEnoncedelaReponseIsRequired() throws Exception {
        int databaseSizeBeforeTest = reponseRepository.findAll().size();
        // set the field null
        reponse.setEnoncedelaReponse(null);

        // Create the Reponse, which fails.


        restReponseMockMvc.perform(post("/api/reponses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isBadRequest());

        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkVeriteIsRequired() throws Exception {
        int databaseSizeBeforeTest = reponseRepository.findAll().size();
        // set the field null
        reponse.setVerite(null);

        // Create the Reponse, which fails.


        restReponseMockMvc.perform(post("/api/reponses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isBadRequest());

        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReponses() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        // Get all the reponseList
        restReponseMockMvc.perform(get("/api/reponses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reponse.getId().intValue())))
            .andExpect(jsonPath("$.[*].enoncedelaReponse").value(hasItem(DEFAULT_ENONCEDELA_REPONSE)))
            .andExpect(jsonPath("$.[*].verite").value(hasItem(DEFAULT_VERITE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        // Get the reponse
        restReponseMockMvc.perform(get("/api/reponses/{id}", reponse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reponse.getId().intValue()))
            .andExpect(jsonPath("$.enoncedelaReponse").value(DEFAULT_ENONCEDELA_REPONSE))
            .andExpect(jsonPath("$.verite").value(DEFAULT_VERITE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingReponse() throws Exception {
        // Get the reponse
        restReponseMockMvc.perform(get("/api/reponses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();

        // Update the reponse
        Reponse updatedReponse = reponseRepository.findById(reponse.getId()).get();
        // Disconnect from session so that the updates on updatedReponse are not directly saved in db
        em.detach(updatedReponse);
        updatedReponse
            .enoncedelaReponse(UPDATED_ENONCEDELA_REPONSE)
            .verite(UPDATED_VERITE);

        restReponseMockMvc.perform(put("/api/reponses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReponse)))
            .andExpect(status().isOk());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
        Reponse testReponse = reponseList.get(reponseList.size() - 1);
        assertThat(testReponse.getEnoncedelaReponse()).isEqualTo(UPDATED_ENONCEDELA_REPONSE);
        assertThat(testReponse.isVerite()).isEqualTo(UPDATED_VERITE);
    }

    @Test
    @Transactional
    public void updateNonExistingReponse() throws Exception {
        int databaseSizeBeforeUpdate = reponseRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReponseMockMvc.perform(put("/api/reponses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reponse)))
            .andExpect(status().isBadRequest());

        // Validate the Reponse in the database
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReponse() throws Exception {
        // Initialize the database
        reponseRepository.saveAndFlush(reponse);

        int databaseSizeBeforeDelete = reponseRepository.findAll().size();

        // Delete the reponse
        restReponseMockMvc.perform(delete("/api/reponses/{id}", reponse.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reponse> reponseList = reponseRepository.findAll();
        assertThat(reponseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
